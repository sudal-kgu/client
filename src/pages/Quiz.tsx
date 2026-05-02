import { useEffect, useRef } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import useQuizSession, {
    clearQuizPausedState,
    saveQuizPausedState,
} from '../api/hooks/useQuizSession';
import QuizAPI from '../api/quiz';
import PageContainer from '../components/common/PageContainer';
import QuizOptionItem from '../components/quiz/QuizOptionItem';
import QuizProgress from '../components/quiz/QuizProgress';
import usePerProblemTimer from '../hooks/usePerProblemTimer';
import useQuiz, { type QuizOption, type QuizQuestion } from '../hooks/useQuiz';

interface QuizBodyProps {
    problemIndex: number;
    totalCount: number;
    question: QuizQuestion;
    selectedOptionId: number | null;
    onSelectOption: (id: number) => void;
    onNext: (isExpired: boolean) => void;
    isLastQuestion: boolean;
    initialSeconds: number | null;
    forceExpired: boolean;
    onRemainingSecondsChange: (seconds: number) => void;
}

const QuizBody = ({
    problemIndex,
    totalCount,
    question,
    selectedOptionId,
    onSelectOption,
    onNext,
    isLastQuestion,
    initialSeconds,
    forceExpired,
    onRemainingSecondsChange,
}: QuizBodyProps) => {
    const { remainingSeconds, isExpired } = usePerProblemTimer(
        problemIndex,
        initialSeconds,
        forceExpired,
    );

    const onRemainingRef = useRef(onRemainingSecondsChange);
    onRemainingRef.current = onRemainingSecondsChange;
    useEffect(() => {
        onRemainingRef.current(remainingSeconds);
    }, [remainingSeconds]);

    const isNextEnabled = selectedOptionId !== null || isExpired;

    const handleClick = () => {
        const label = isLastQuestion ? 'Result' : 'Next';
        console.log(`[Quiz Timer] ${label} button clicked from problem ${problemIndex + 1}`);
        onNext(isExpired);
    };

    return (
        <>
            <div className="content">
                <QuizProgress current={problemIndex + 1} total={totalCount} />
                <div
                    className={[
                        'timer',
                        isExpired ? 'expired' : '',
                        !isExpired && remainingSeconds <= 5 ? 'warning' : '',
                    ]
                        .filter(Boolean)
                        .join(' ')}
                >
                    {isExpired ? '시간 초과' : `${remainingSeconds}초`}
                </div>
                <div className="question">{question.question}</div>
                <div className="options">
                    {question.options.map((option: QuizOption, index: number) => (
                        <QuizOptionItem
                            key={option.id}
                            option={option}
                            index={index}
                            selectionState={selectedOptionId === option.id ? 'selected' : 'idle'}
                            onClick={() => {
                                if (!isExpired) onSelectOption(option.id);
                            }}
                            disabled={isExpired}
                        />
                    ))}
                </div>
            </div>
            <div className="footer">
                <button className="next-btn" disabled={!isNextEnabled} onClick={handleClick}>
                    {isLastQuestion ? '결과 보기' : '다음'}
                </button>
            </div>
        </>
    );
};

const Quiz = () => {
    const navigate = useNavigate();
    const { analysisId, trashId } = useParams();
    const serial = trashId ?? '';

    const {
        sessionId,
        questions,
        initialChoices,
        initialIndex,
        initialExpiredIndices,
        restoredProblemInfo,
        fetchNextProblem,
        isLoading,
        error,
    } = useQuizSession(serial);

    const {
        currentQuestion,
        currentIndex,
        totalCount,
        selectedOptionId,
        selectedOptionIds,
        expiredIndices,
        selectOption,
        goNext,
    } = useQuiz({
        questions,
        initialChoices,
        initialIndex,
        initialExpiredIndices: initialExpiredIndices ?? undefined,
        onFinish: async (selectedOptionIds, expiredIndices) => {
            if (sessionId === null) return;
            isCompletedRef.current = true;
            clearQuizPausedState(serial);
            await QuizAPI.completeSession(sessionId);
            console.log('[Quiz Timer] Quiz completed — fetching full results');

            let finalProblems = null;
            try {
                finalProblems = await QuizAPI.getProblems(sessionId);
            } catch (e) {
                console.warn('[Quiz] getProblems failed, falling back to local state', e);
            }

            if (finalProblems && finalProblems.length > 0) {
                navigate(`/analysis/${analysisId}/trashes/${trashId}/quiz/result`, {
                    state: { problems: finalProblems, expiredIndices },
                });
            } else {
                navigate(`/analysis/${analysisId}/trashes/${trashId}/quiz/result`, {
                    state: { questions, selectedOptionIds, expiredIndices },
                });
            }
        },
    });

    const remainingSecondsRef = useRef<number>(20);
    const currentIndexRef = useRef<number>(currentIndex);
    const selectedOptionIdsRef = useRef<(number | null)[]>(selectedOptionIds);
    const expiredIndicesRef = useRef<boolean[]>(expiredIndices);
    const sessionIdRef = useRef<number | null>(sessionId);
    const isCompletedRef = useRef(false);

    useEffect(() => {
        currentIndexRef.current = currentIndex;
    }, [currentIndex]);
    useEffect(() => {
        selectedOptionIdsRef.current = selectedOptionIds;
    }, [selectedOptionIds]);
    useEffect(() => {
        expiredIndicesRef.current = expiredIndices;
    }, [expiredIndices]);
    useEffect(() => {
        sessionIdRef.current = sessionId;
    }, [sessionId]);

    useEffect(() => {
        return () => {
            if (isCompletedRef.current) return;
            if (sessionIdRef.current === null) return;

            const state = {
                sessionId: sessionIdRef.current,
                currentIndex: currentIndexRef.current,
                pausedRemainingSeconds: remainingSecondsRef.current,
                selectedChoices: selectedOptionIdsRef.current,
                expiredIndices: expiredIndicesRef.current,
            };
            console.log(
                `[Quiz Pause] Leaving quiz screen on problem ${state.currentIndex + 1} with ${state.pausedRemainingSeconds}s remaining`,
            );
            saveQuizPausedState(serial, state);
            console.log(`[Quiz Pause] Timer cleaned up for problem ${state.currentIndex + 1}`);
        };
    }, [serial]);

    if (isLoading) {
        return (
            <PageContainer>
                <StyledContainer>
                    <div className="content">
                        <div className="status-text">퀴즈를 불러오는 중...</div>
                    </div>
                </StyledContainer>
            </PageContainer>
        );
    }

    if (error || questions.length === 0) {
        return (
            <PageContainer>
                <StyledContainer>
                    <div className="content">
                        <div className="status-text">퀴즈를 불러오지 못했습니다.</div>
                    </div>
                </StyledContainer>
            </PageContainer>
        );
    }

    if (!currentQuestion || currentQuestion.question === '') {
        return (
            <PageContainer>
                <StyledContainer>
                    <div className="content">
                        <div className="status-text">문제를 불러오는 중...</div>
                    </div>
                </StyledContainer>
            </PageContainer>
        );
    }

    const isRestoredProblem = restoredProblemInfo !== null && currentIndex === initialIndex;
    const timerInitialSeconds = isRestoredProblem
        ? restoredProblemInfo!.initialRemainingSeconds
        : null;
    const timerForceExpired = isRestoredProblem
        ? restoredProblemInfo!.isAlreadyExpiredOnServer
        : false;

    if (isRestoredProblem) {
        console.log(
            `[Quiz Resume] Re-entered quiz on problem ${currentIndex + 1} with ${timerInitialSeconds}s remaining`,
        );
        console.log(`[Quiz Resume] Restored selected choice for problem ${currentIndex + 1}`);
    }

    const handleNext = (isExpired: boolean) => {
        goNext(isExpired, async (problemId, choiceId, nextIndex, expired) => {
            if (sessionId === null) return;

            if (!expired && choiceId !== null) {
                try {
                    console.log(
                        `[Quiz Submit] Submitting answer for session ${sessionId}, problem ${problemId}`,
                    );
                    await QuizAPI.submitAnswer(sessionId, problemId, choiceId);
                } catch (e: unknown) {
                    const status = (e as { response?: { status?: number } })?.response?.status;
                    if (status === 410) {
                        console.warn(
                            `[Quiz Submit] 410 received, syncing client state with server — problem ${problemId} treated as expired`,
                        );
                    } else if (status === 400) {
                        console.warn(
                            `[Quiz Submit] 400 received for problem ${problemId} — already answered`,
                        );
                    } else {
                        throw e;
                    }
                }
            }

            if (nextIndex < totalCount) {
                try {
                    await fetchNextProblem(nextIndex);
                } catch (e: unknown) {
                    const status = (e as { response?: { status?: number } })?.response?.status;
                    if (status === 410) {
                        console.warn(
                            `[Quiz Submit] 410 on fetchNextProblem index ${nextIndex} — continuing`,
                        );
                    } else {
                        throw e;
                    }
                }
            }
        });
    };

    return (
        <PageContainer>
            <StyledContainer>
                <QuizBody
                    key={`${currentIndex}-${timerInitialSeconds ?? 'fresh'}`}
                    problemIndex={currentIndex}
                    totalCount={totalCount}
                    question={currentQuestion}
                    selectedOptionId={selectedOptionId}
                    onSelectOption={selectOption}
                    onNext={handleNext}
                    isLastQuestion={currentIndex + 1 === totalCount}
                    initialSeconds={timerInitialSeconds}
                    forceExpired={timerForceExpired}
                    onRemainingSecondsChange={(s) => {
                        remainingSecondsRef.current = s;
                    }}
                />
            </StyledContainer>
        </PageContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;

    .content {
        flex: 1;
        padding: 24px 24px 16px;
        display: flex;
        flex-direction: column;
        gap: 24px;
        overflow-y: auto;

        .timer {
            align-self: flex-start;
            font-size: 14px;
            font-weight: 700;
            color: ${({ theme }) => theme.colors.primary700};
            background-color: ${({ theme }) => theme.colors.primary100};
            padding: 6px 14px;
            border-radius: 999px;
            transition:
                color 0.2s ease,
                background-color 0.2s ease;
            &.warning {
                color: #d97706;
                background-color: #fef3c7;
            }
            &.expired {
                color: ${({ theme }) => theme.colors.badge};
                background-color: ${({ theme }) => theme.colors.error_op_10};
            }
        }
        .question {
            font-size: 17px;
            font-weight: 600;
            color: ${({ theme }) => theme.colors.black};
            line-height: 1.5;
            word-break: keep-all;
        }
        .options {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .status-text {
            font-size: 15px;
            color: ${({ theme }) => theme.colors.black};
        }
    }

    .footer {
        padding: 12px 24px 24px;
        background-color: ${({ theme }) => theme.colors.background};

        .next-btn {
            width: 100%;
            padding: 16px;
            border-radius: 64px;
            font-size: 16px;
            font-weight: 600;
            color: ${({ theme }) => theme.colors.white};
            background-color: ${({ theme }) => theme.colors.primary700};
            transition: opacity 0.2s ease;
            &:disabled {
                opacity: 0.35;
            }
        }
    }
`;

export default Quiz;
