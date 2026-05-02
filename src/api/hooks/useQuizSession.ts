import { useEffect, useRef, useState } from 'react';

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

const isSolved = (choice: number | null | undefined): boolean =>
    choice !== null && choice !== undefined && choice !== 0;

const isExpiredOnServer = (expiredAt: string | null): boolean =>
    expiredAt !== null && new Date(expiredAt).getTime() < Date.now();

const storageKey = (serial: string) => `quiz_state_${serial}`;

export interface QuizPausedState {
    sessionId: number;
    currentIndex: number;
    pausedRemainingSeconds: number;
    selectedChoices: (number | null)[];
    expiredIndices: boolean[];
}

export const saveQuizPausedState = (serial: string, state: QuizPausedState) => {
    try {
        sessionStorage.setItem(storageKey(serial), JSON.stringify(state));
    } catch {
        /* 무시 */
    }
};

export const loadQuizPausedState = (serial: string): QuizPausedState | null => {
    try {
        const raw = sessionStorage.getItem(storageKey(serial));
        return raw ? (JSON.parse(raw) as QuizPausedState) : null;
    } catch {
        return null;
    }
};

export const clearQuizPausedState = (serial: string) => {
    try {
        sessionStorage.removeItem(storageKey(serial));
    } catch {
        /* 무시 */
    }
};

export interface RestoredProblemInfo {
    initialRemainingSeconds: number;
    isAlreadyExpiredOnServer: boolean;
}

const useQuizSession = (serial: string) => {
    const [sessionId, setSessionId] = useState<number | null>(null);
    const [sessionProblemIds, setSessionProblemIds] = useState<number[]>([]);
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [initialChoices, setInitialChoices] = useState<(number | null)[]>([]);
    const [initialIndex, setInitialIndex] = useState(0);
    const [initialExpiredIndices, setInitialExpiredIndices] = useState<boolean[] | null>(null);
    const [restoredProblemInfo, setRestoredProblemInfo] = useState<RestoredProblemInfo | null>(
        null,
    );
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const sessionIdRef = useRef<number | null>(null);
    const sessionProblemIdsRef = useRef<number[]>([]);

    useEffect(() => {
        sessionIdRef.current = sessionId;
    }, [sessionId]);
    useEffect(() => {
        sessionProblemIdsRef.current = sessionProblemIds;
    }, [sessionProblemIds]);

    useEffect(() => {
        const init = async () => {
            try {
                const paused = loadQuizPausedState(serial);
                const session = await QuizAPI.createSession(serial);
                setSessionId(session.sessionId);
                setSessionProblemIds(session.problems);
                sessionIdRef.current = session.sessionId;
                sessionProblemIdsRef.current = session.problems;

                const placeholderQuestions: QuizQuestion[] = session.problems.map((id) => ({
                    id,
                    question: '',
                    options: [],
                    correctOptionId: 0,
                    expiredAt: null,
                }));

                if (paused && paused.sessionId === session.sessionId) {
                    console.log(
                        `[Quiz Resume] Existing in-progress session found - restoring progress`,
                    );

                    const activeIndex = paused.currentIndex;
                    const activeProblemId = session.problems[activeIndex];

                    console.log(
                        `[Quiz Session] Revalidating current problem ${activeProblemId} with server`,
                    );

                    let serverProblem: QuizProblem | null = null;
                    try {
                        serverProblem = await QuizAPI.getProblem(
                            session.sessionId,
                            activeProblemId,
                        );
                    } catch (e: unknown) {
                        const status = (e as { response?: { status?: number } })?.response?.status;
                        if (status === 410) {
                            console.log(
                                `[Quiz Session] Problem ${activeProblemId} expired on server (410 on revalidation)`,
                            );
                        } else {
                            throw e;
                        }
                    }

                    const serverExpired =
                        serverProblem === null || isExpiredOnServer(serverProblem.expiredAt);

                    if (serverExpired) {
                        console.log(`[Quiz Resume] Restoring active problemId: ${activeProblemId}`);
                        console.log(`[Quiz Resume] Restoring currentProblemIndex: ${activeIndex}`);
                        console.log(
                            `[Quiz Resume] Restoring paused remaining time: ${paused.pausedRemainingSeconds}s`,
                        );
                        console.log(`[Quiz Resume] Current problem locked during restore`);
                        console.log(`[Quiz Resume] Suppressed auto-next during restore`);
                        console.log(`[Quiz Resume] Suppressed expire transition during restore`);

                        if (serverProblem) {
                            placeholderQuestions[activeIndex] = toQuizQuestion(serverProblem);
                        }

                        clearQuizPausedState(serial);
                        setQuestions([...placeholderQuestions]);
                        setInitialChoices([...paused.selectedChoices]);
                        setInitialIndex(activeIndex);
                        setInitialExpiredIndices([...paused.expiredIndices]);
                        setRestoredProblemInfo({
                            initialRemainingSeconds: Math.max(0, paused.pausedRemainingSeconds),
                            isAlreadyExpiredOnServer: false,
                        });

                        console.log(
                            `[Quiz Resume] Re-entry complete on same problem ${activeIndex + 1} with ${paused.pausedRemainingSeconds}s`,
                        );
                        console.log(`[Quiz Resume] No problem transition occurred during re-entry`);
                    } else {
                        const resumeSeconds = Math.max(0, paused.pausedRemainingSeconds);

                        const serverRemainingMs =
                            new Date(serverProblem!.expiredAt!).getTime() - Date.now();
                        const serverRemainingSec = Math.max(0, Math.ceil(serverRemainingMs / 1000));

                        console.log(`[Quiz Resume] Restoring active problemId: ${activeProblemId}`);
                        console.log(`[Quiz Resume] Restoring currentProblemIndex: ${activeIndex}`);
                        console.log(
                            `[Quiz Resume] Restoring paused remaining time: ${paused.pausedRemainingSeconds}s`,
                        );
                        console.log(
                            `[Quiz Resume] Found paused remaining time: ${paused.pausedRemainingSeconds}s`,
                        );
                        console.log(
                            `[Quiz Resume] Ignoring recalculated/server remaining time: ${serverRemainingSec}s`,
                        );
                        console.log(
                            `[Quiz Resume] Restoring problem ${activeIndex + 1} with ${resumeSeconds}s remaining`,
                        );
                        console.log(`[Quiz Resume] Current problem locked during restore`);

                        placeholderQuestions[activeIndex] = toQuizQuestion(serverProblem!);

                        clearQuizPausedState(serial);
                        setQuestions([...placeholderQuestions]);
                        setInitialChoices([...paused.selectedChoices]);
                        setInitialIndex(activeIndex);
                        setInitialExpiredIndices([...paused.expiredIndices]);
                        setRestoredProblemInfo({
                            initialRemainingSeconds: resumeSeconds,
                            isAlreadyExpiredOnServer: false,
                        });

                        console.log(
                            `[Quiz Resume] Re-entry complete on same problem ${activeIndex + 1} with ${resumeSeconds}s`,
                        );
                        console.log(`[Quiz Resume] No problem transition occurred during re-entry`);
                    }
                } else {
                    if (paused) {
                        console.log(
                            `[Quiz Start] New quiz session detected - resetting all previous quiz state`,
                        );
                        clearQuizPausedState(serial);
                    }

                    let activeIndex = 0;
                    const solvedChoices: (number | null)[] = session.problems.map(() => null);
                    let foundActive = false;

                    for (let i = 0; i < session.problems.length; i++) {
                        const problemId = session.problems[i];
                        const problem = await QuizAPI.getProblem(session.sessionId, problemId);

                        if (isSolved(problem.choice)) {
                            solvedChoices[i] = problem.choice ?? null;
                            console.log(`[Quiz Session] Problem ${i + 1} already solved`);
                        } else if (isExpiredOnServer(problem.expiredAt)) {
                            console.log(
                                `[Quiz Session] Ignoring expired old problem ${i + 1} during restore`,
                            );
                        } else {
                            activeIndex = i;
                            placeholderQuestions[i] = toQuizQuestion(problem);
                            foundActive = true;
                            if (i === 0) {
                                console.log(
                                    `[Quiz Start] Starting fresh from problem 1 (id: ${problemId})`,
                                );
                            } else {
                                console.log(
                                    `[Quiz Start] Resuming from problem ${i + 1} (id: ${problemId}) — previous problems already solved or expired`,
                                );
                            }
                            break;
                        }
                    }

                    if (!foundActive) {
                        activeIndex = session.problems.length - 1;
                        console.log(
                            `[Quiz Session] All problems resolved — restoring last problem`,
                        );
                    }

                    setQuestions([...placeholderQuestions]);
                    setInitialChoices(solvedChoices);
                    setInitialIndex(activeIndex);
                    setInitialExpiredIndices(null);
                    setRestoredProblemInfo(null);
                }
            } catch (err) {
                setError(err instanceof Error ? err : new Error('퀴즈를 불러오지 못했습니다.'));
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
        console.log(
            `[Quiz Session] Fetching problem ${nextIndex + 1} (id: ${problemId}) — new timer will start`,
        );

        const problem = await QuizAPI.getProblem(currentSessionId, problemId);
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
        initialExpiredIndices,
        restoredProblemInfo,
        fetchNextProblem,
        isLoading,
        error,
    };
};

export default useQuizSession;
