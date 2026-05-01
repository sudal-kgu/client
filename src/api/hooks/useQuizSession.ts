import { useEffect, useState } from 'react';

import type { QuizQuestion } from '../../hooks/useQuiz';
import QuizAPI from '../quiz';
import type { QuizProblem } from '../types';

const toQuizQuestion = (problem: QuizProblem): QuizQuestion => ({
    id: problem.problemId,
    question: problem.description,
    options: problem.choices
        .sort((a, b) => a.order - b.order)
        .map((c) => ({ id: c.id, text: c.description })),
    correctOptionId: problem.answer,
    expiredAt: problem.expiredAt,
});

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

                const allProblems = await Promise.all(
                    session.problems.map((id) => QuizAPI.getProblem(session.sessionId, id)),
                );

                const firstUnsolvedIndex = allProblems.findIndex((p) => p.choice === 0);
                const currentIndex =
                    firstUnsolvedIndex === -1 ? allProblems.length - 1 : firstUnsolvedIndex;

                let currentProblem: QuizProblem;
                if (firstUnsolvedIndex === -1) {
                    currentProblem = allProblems[currentIndex];
                } else {
                    currentProblem = await QuizAPI.getProblem(
                        session.sessionId,
                        session.problems[firstUnsolvedIndex],
                    );
                    allProblems[firstUnsolvedIndex] = currentProblem;
                }

                setQuestions(allProblems.map(toQuizQuestion));
                setInitialChoices(allProblems.map((p) => (p.choice !== 0 ? p.choice : null)));
                setInitialIndex(currentIndex);
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

        const problem = await QuizAPI.getProblem(sessionId, sessionProblemIds[nextIndex]);
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
