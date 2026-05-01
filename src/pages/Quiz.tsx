import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import useQuizSession from '../api/hooks/useQuizSession';
import QuizAPI from '../api/quiz';
import PageContainer from '../components/common/PageContainer';
import QuizOptionItem from '../components/quiz/QuizOptionItem';
import QuizProgress from '../components/quiz/QuizProgress';
import useExpiredAt from '../hooks/useExpiredAt';
import useQuiz from '../hooks/useQuiz';

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
            onBeforeNext: async (problemId, choiceId, nextIndex) => {
                if (sessionId === null) return;
                await QuizAPI.submitAnswer(sessionId, problemId, choiceId);
                if (nextIndex < totalCount) {
                    await fetchNextProblem(nextIndex);
                }
            },
            onFinish: async (selectedOptionIds) => {
                if (sessionId !== null) {
                    await QuizAPI.completeSession(sessionId);
                }
                navigate(`/analysis/${analysisId}/trashes/${trashId}/quiz/result`, {
                    state: { questions, selectedOptionIds },
                });
            },
        });

    const { isExpired } = useExpiredAt(currentQuestion?.expiredAt ?? null);

    const isLastQuestion = currentIndex + 1 === totalCount;

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

    return (
        <PageContainer>
            <StyledContainer>
                <div className="content">
                    <QuizProgress current={currentIndex + 1} total={totalCount} />
                    <div className="question">{currentQuestion.question}</div>
                    <div className="options">
                        {currentQuestion.options.map((option, index) => (
                            <QuizOptionItem
                                key={option.id}
                                option={option}
                                index={index}
                                selectionState={
                                    selectedOptionId === option.id ? 'selected' : 'idle'
                                }
                                onClick={() => !isExpired && selectOption(option.id)}
                            />
                        ))}
                    </div>
                </div>
                <div className="footer">
                    <button
                        className="next-btn"
                        disabled={selectedOptionId === null || isExpired}
                        onClick={goNext}
                    >
                        {isLastQuestion ? '결과 보기' : '다음'}
                    </button>
                </div>
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
