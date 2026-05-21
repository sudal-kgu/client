import { useEffect, useRef, useState } from 'react';

import type { QuizQuestion } from '../../hooks/useQuiz';
import QuizAPI from '../quiz';
import type { QuizChoice, QuizProblem } from '../types';

export const resolveCorrectOptionId = (answer: number, sortedChoices: QuizChoice[]): number => {
    const byId = sortedChoices.find((c) => c.id === answer);
    const byOrder = sortedChoices.find((c) => c.order === answer);
    return (byId ?? byOrder)?.id ?? answer;
};

export const toQuizQuestion = (problem: QuizProblem): QuizQuestion => {
    const sortedChoices = [...problem.choices].sort((a, b) => a.order - b.order);
    const correctOptionId = resolveCorrectOptionId(problem.answer, sortedChoices);
    return {
        id: problem.problemId,
        question: problem.description,
        options: sortedChoices.map((c) => ({ id: c.id, text: c.description })),
        correctOptionId,
        expiredAt: problem.expiredAt ?? null,
    };
};

const getAdvancedKey = (sessionId: number) => `quiz_advanced_${sessionId}`;

const loadAdvancedIndices = (sessionId: number): Set<number> => {
    try {
        const raw = sessionStorage.getItem(getAdvancedKey(sessionId));
        if (!raw) return new Set();
        return new Set(JSON.parse(raw) as number[]);
    } catch {
        return new Set();
    }
};

export const saveAdvancedIndex = (sessionId: number, index: number) => {
    try {
        const existing = loadAdvancedIndices(sessionId);
        existing.add(index);
        sessionStorage.setItem(getAdvancedKey(sessionId), JSON.stringify([...existing]));
    } catch {}
};

export const clearAdvancedIndices = (sessionId: number) => {
    try {
        sessionStorage.removeItem(getAdvancedKey(sessionId));
    } catch {}
};

export interface QuizSessionAllCompletedArgs {
    sessionId: number;
}

const useQuizSession = (
    serial: string,
    onAllCompleted?: (args: QuizSessionAllCompletedArgs) => void,
) => {
    const [sessionId, setSessionId] = useState<number | null>(null);
    const [sessionProblemIds, setSessionProblemIds] = useState<number[]>([]);
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [initialChoices, setInitialChoices] = useState<(number | null)[]>([]);
    const [initialIndex, setInitialIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const sessionIdRef = useRef<number | null>(null);
    const sessionProblemIdsRef = useRef<number[]>([]);
    const onAllCompletedRef = useRef(onAllCompleted);
    onAllCompletedRef.current = onAllCompleted;

    useEffect(() => {
        sessionIdRef.current = sessionId;
    }, [sessionId]);
    useEffect(() => {
        sessionProblemIdsRef.current = sessionProblemIds;
    }, [sessionProblemIds]);

    useEffect(() => {
        const init = async () => {
            try {
                const session = await QuizAPI.createSession(serial);

                setSessionId(session.sessionId);
                setSessionProblemIds(session.problems);
                sessionIdRef.current = session.sessionId;
                sessionProblemIdsRef.current = session.problems;

                const advancedIndices = loadAdvancedIndices(session.sessionId);

                const fetchedQuestions: (QuizQuestion | null)[] = Array(
                    session.problems.length,
                ).fill(null);
                const solvedChoices: (number | null)[] = session.problems.map(() => null);
                let activeIndex = 0;
                let foundActive = false;

                for (let i = 0; i < session.problems.length; i++) {
                    if (advancedIndices.has(i)) {
                        activeIndex = i + 1;
                        continue;
                    }

                    const problemId = session.problems[i];
                    const problem = await QuizAPI.getProblem(session.sessionId, problemId);

                    fetchedQuestions[i] = toQuizQuestion(problem);

                    if (problem.choice != null) {
                        solvedChoices[i] = problem.choice;
                        activeIndex = i + 1;
                        continue;
                    }

                    activeIndex = i;
                    foundActive = true;
                    break;
                }

                if (!foundActive && activeIndex >= session.problems.length) {
                    clearAdvancedIndices(session.sessionId);
                    onAllCompletedRef.current?.({ sessionId: session.sessionId });
                    return;
                }

                const placeholderQuestions: QuizQuestion[] = session.problems.map((id, i) => {
                    if (fetchedQuestions[i] !== null) return fetchedQuestions[i] as QuizQuestion;
                    return {
                        id,
                        question: '',
                        options: [],
                        correctOptionId: 0,
                        expiredAt: null,
                    };
                });

                setQuestions(placeholderQuestions);
                setInitialChoices(solvedChoices);
                setInitialIndex(activeIndex);
            } catch (err) {
                setError(
                    err instanceof Error ? err : new Error('퀴즈 세션을 불러오지 못했습니다.'),
                );
            } finally {
                setIsLoading(false);
            }
        };

        init();
    }, [serial]);

    const fetchNextProblem = async (nextIndex: number): Promise<void> => {
        const currentSessionId = sessionIdRef.current;
        const currentProblemIds = sessionProblemIdsRef.current;
        if (currentSessionId === null || !currentProblemIds[nextIndex]) return;

        const problemId = currentProblemIds[nextIndex];
        const problem = await QuizAPI.getProblem(currentSessionId, problemId);

        setQuestions((prev) => {
            const next = [...prev];
            next[nextIndex] = toQuizQuestion(problem);
            return next;
        });
    };

    return {
        sessionId,
        questions,
        initialChoices,
        initialIndex,
        fetchNextProblem,
        isLoading,
        error,
    };
};

export default useQuizSession;
