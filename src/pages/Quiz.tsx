import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import useQuizSession from '../api/hooks/useQuizSession';
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
}

const QuizBody = ({
    problemIndex,
    totalCount,
    question,
    selectedOptionId,
    onSelectOption,
    onNext,
    isLastQuestion,
}: QuizBodyProps) => {
    const { remainingSeconds, isExpired } = usePerProblemTimer(
        problemIndex,
        question.expiredAt ?? null,
    );

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
        fetchNextProblem,
        isLoading,
        error,
    } = useQuizSession(serial);

    const { currentQuestion, currentIndex, totalCount, selectedOptionId, selectOption, goNext } =
        useQuiz({
            questions,
            initialChoices,
            initialIndex,
            onFinish: async (selectedOptionIds, expiredIndices) => {
                if (sessionId === null) return;

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
                        state: {
                            problems: finalProblems,
                            expiredIndices,
                        },
                    });
                } else {
                    navigate(`/analysis/${analysisId}/trashes/${trashId}/quiz/result`, {
                        state: {
                            questions,
                            selectedOptionIds,
                            expiredIndices,
                        },
                    });
                }
            },
        });

    const handleNext = (isExpired: boolean) => {
        goNext(isExpired, async (problemId, choiceId, nextIndex, expired) => {
            if (sessionId === null) return;

            if (!expired && choiceId !== null) {
                await QuizAPI.submitAnswer(sessionId, problemId, choiceId);
            }

            if (nextIndex < totalCount) {
                await fetchNextProblem(nextIndex);
            }
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
