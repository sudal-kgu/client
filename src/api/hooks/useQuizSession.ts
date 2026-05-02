import { useEffect, useState } from 'react';

import type { QuizQuestion } from '../../hooks/useQuiz';
import QuizAPI from '../quiz';
import type { QuizProblem } from '../types';

const toQuizQuestion = (problem: QuizProblem): QuizQuestion => {
    const sortedChoices = [...problem.choices].sort((a, b) => a.order - b.order);

    const correctByIdMatch = sortedChoices.find((c) => c.id === problem.answer);
    const correctByOrderMatch = sortedChoices.find((c) => c.order === problem.answer);
    const correctChoice = correctByIdMatch ?? correctByOrderMatch;
    const correctOptionId = correctChoice?.id ?? problem.answer;

    return {
        id: problem.problemId,
        question: problem.description,
        options: sortedChoices.map((c) => ({ id: c.id, text: c.description })),
        correctOptionId,
        expiredAt: problem.expiredAt ?? null,
    };
};

const useQuizSession = (serial: string) => {
    const [sessionId, setSessionId] = useState<number | null>(null);
    const [sessionProblemIds, setSessionProblemIds] = useState<number[]>([]);
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [initialChoices, setInitialChoices] = useState<(number | null)[]>([]);
    const [initialIndex, setInitialIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const init = async () => {
            try {
                const session = await QuizAPI.createSession(serial);
                setSessionId(session.sessionId);
                setSessionProblemIds(session.problems);

                console.log('[Quiz Session] Session created, problemIds:', session.problems);

                const placeholderQuestions: QuizQuestion[] = session.problems.map((id) => ({
                    id,
                    question: '',
                    options: [],
                    correctOptionId: 0,
                    expiredAt: null,
                }));

                const firstIndex = 0;
                const firstProblemId = session.problems[firstIndex];

                console.log(`[Quiz Session] Fetching problem 1 (id: ${firstProblemId})`);

                const firstProblem = await QuizAPI.getProblem(session.sessionId, firstProblemId);

                console.log(`[Quiz Session] Problem 1 expiredAt: ${firstProblem.expiredAt}`);

                placeholderQuestions[firstIndex] = toQuizQuestion(firstProblem);

                setQuestions([...placeholderQuestions]);
                setInitialChoices(session.problems.map(() => null));
                setInitialIndex(firstIndex);

                console.log('[Quiz Session] Ready. Problem 1 loaded.');
            } catch (err) {
                setError(err instanceof Error ? err : new Error('퀴즈를 불러오지 못했습니다.'));
            } finally {
                setIsLoading(false);
            }
        };

        init();
    }, [serial]);

    const fetchNextProblem = async (nextIndex: number) => {
        if (sessionId === null || !sessionProblemIds[nextIndex]) return;

        const problemId = sessionProblemIds[nextIndex];
        console.log(`[Quiz Session] Fetching problem ${nextIndex + 1} (id: ${problemId})`);

        const problem = await QuizAPI.getProblem(sessionId, problemId);

        console.log(`[Quiz Session] Problem ${nextIndex + 1} expiredAt: ${problem.expiredAt}`);

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
