import { useEffect, useRef } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import useQuizSession, {
    clearAdvancedIndices,
    saveAdvancedIndex,
} from '../api/hooks/useQuizSession';
import QuizAPI from '../api/quiz';
import PageContainer from '../components/common/PageContainer';
import QuizOptionItem from '../components/quiz/QuizOptionItem';
import QuizProgress from '../components/quiz/QuizProgress';
import usePerProblemTimer from '../hooks/usePerProblemTimer';
import useQuiz, { type QuizOption, type QuizQuestion } from '../hooks/useQuiz';

const POINTS_PER_CORRECT = 50;

const CIRCLE_RADIUS = 20;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

const getResponseStatus = (e: unknown): number | undefined =>
    (e as { response?: { status?: number } })?.response?.status;

interface QuizBodyProps {
    problemIndex: number;
    totalCount: number;
    question: QuizQuestion;
    selectedOptionId: number | null;
    onSelectOption: (id: number) => void;
    onNext: (isExpired: boolean) => void;
    isLastQuestion: boolean;
    isAdvancing: boolean;
}

const QuizBody = ({
    problemIndex,
    totalCount,
    question,
    selectedOptionId,
    onSelectOption,
    onNext,
    isLastQuestion,
    isAdvancing,
}: QuizBodyProps) => {
    const { remainingSeconds, totalSeconds, isExpired } = usePerProblemTimer(question.expiredAt);

    const isNextEnabled = (selectedOptionId !== null || isExpired) && !isAdvancing;

    const handleClick = () => {
        onNext(isExpired);
    };

    const progress = totalSeconds > 0 ? remainingSeconds / totalSeconds : 0;
    const strokeDashoffset = CIRCLE_CIRCUMFERENCE * (1 - progress);

    const timerState = isExpired ? 'expired' : remainingSeconds <= 5 ? 'warning' : 'normal';
    const strokeColor =
        timerState === 'expired' ? '#A73B21' : timerState === 'warning' ? '#d97706' : '#185E27';

    return (
        <>
            <div className="content">
                <QuizProgress current={problemIndex + 1} total={totalCount} />
                <CircleTimer state={timerState}>
                    <svg
                        width="52"
                        height="52"
                        viewBox="0 0 52 52"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="26"
                            cy="26"
                            r={CIRCLE_RADIUS}
                            strokeWidth="4"
                            className="track"
                        />
                        <circle
                            cx="26"
                            cy="26"
                            r={CIRCLE_RADIUS}
                            strokeWidth="4"
                            stroke={strokeColor}
                            strokeDasharray={CIRCLE_CIRCUMFERENCE}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            transform="rotate(-90 26 26)"
                            style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s ease' }}
                            className="progress"
                        />
                    </svg>
                    <span className="label">
                        {isExpired ? '시간\n초과' : `${remainingSeconds}초`}
                    </span>
                </CircleTimer>
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
                <button
                    type="button"
                    className="next-btn"
                    disabled={!isNextEnabled}
                    onClick={handleClick}
                >
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

    const resultPath = `/analysis/${analysisId}/trashes/${trashId}/quiz/result`;

    const {
        sessionId,
        questions,
        initialChoices,
        initialIndex,
        fetchNextProblem,
        isLoading,
        error,
    } = useQuizSession(serial, (completedSessionId) => {
        QuizAPI.getProblems(completedSessionId)
            .then((finalProblems) => {
                navigate(resultPath, {
                    state: { problems: finalProblems, expiredIndices: [] },
                });
            })
            .catch(() => {
                navigate('/');
            });
    });

    const {
        currentQuestion,
        currentIndex,
        totalCount,
        selectedOptionId,
        isAdvancing,
        selectOption,
        goNext,
    } = useQuiz({
        questions,
        initialChoices,
        initialIndex,
        onFinish: async (selectedOptionIds, expiredIndices) => {
            if (sessionId === null) return;

            clearAdvancedIndices(sessionId);

            try {
                await QuizAPI.completeSession(sessionId);
            } catch {}

            let finalProblems = null;
            try {
                finalProblems = await QuizAPI.getProblems(sessionId);
            } catch {}

            if (finalProblems && finalProblems.length > 0) {
                navigate(resultPath, {
                    state: { problems: finalProblems, expiredIndices },
                });
            } else {
                navigate(resultPath, {
                    state: { questions, selectedOptionIds, expiredIndices },
                });
            }
        },
    });

    const visibilityHandledRef = useRef(false);

    useEffect(() => {
        if (isLoading || questions.length === 0) return;

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible' && !visibilityHandledRef.current) {
                visibilityHandledRef.current = true;
                setTimeout(() => {
                    visibilityHandledRef.current = false;
                }, 1000);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [isLoading, questions.length]);

    const handleNext = (isExpired: boolean) => {
        goNext(isExpired, async ({ problemId, choiceId, nextIndex, isExpired: expired }) => {
            if (sessionId === null) return;

            const advancedIndexToSave = currentIndex;

            if (!expired && choiceId !== null) {
                try {
                    await QuizAPI.submitAnswer(sessionId, problemId, choiceId);
                } catch (e: unknown) {
                    const status = getResponseStatus(e);
                    if (status === 410) {
                    } else if (status === 400) {
                    } else {
                        throw e;
                    }
                }
            }

            if (nextIndex < totalCount) {
                try {
                    await fetchNextProblem(nextIndex);
                } catch (e: unknown) {
                    const status = getResponseStatus(e);
                    if (status === 410) {
                    } else {
                        throw e;
                    }
                }
            }

            saveAdvancedIndex(sessionId, advancedIndexToSave);
        });
    };

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

    return (
        <PageContainer>
            <StyledContainer>
                <QuizBody
                    key={currentIndex}
                    problemIndex={currentIndex}
                    totalCount={totalCount}
                    question={currentQuestion}
                    selectedOptionId={selectedOptionId}
                    onSelectOption={selectOption}
                    onNext={handleNext}
                    isLastQuestion={currentIndex + 1 === totalCount}
                    isAdvancing={isAdvancing}
                />
            </StyledContainer>
        </PageContainer>
    );
};

const CircleTimer = styled.div<{ state: 'normal' | 'warning' | 'expired' }>`
    position: relative;
    width: 52px;
    height: 52px;
    flex-shrink: 0;

    svg {
        display: block;

        .track {
            fill: none;
            stroke: ${({ theme }) => theme.colors.primary300};
        }

        .progress {
            fill: none;
        }
    }

    .label {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: 700;
        text-align: center;
        white-space: pre-line;
        line-height: 1.2;
        color: ${({ state, theme }) =>
            state === 'expired'
                ? theme.colors.badge
                : state === 'warning'
                  ? '#d97706'
                  : theme.colors.primary700};
        transition: color 0.3s ease;
    }
`;

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
        padding: 16px 16px 32px 16px;
        background-color: ${({ theme }) => theme.colors.background};

        .next-btn {
            width: 100%;
            height: 56px;
            border-radius: 64px;
            font-size: 16px;
            font-weight: 700;
            color: ${({ theme }) => theme.colors.white};
            background-color: ${({ theme }) => theme.colors.primary700};
            transition: opacity 0.2s ease;
            &:disabled {
                opacity: 0.35;
                cursor: not-allowed;
            }
        }
    }
`;

export { POINTS_PER_CORRECT };
export default Quiz;
