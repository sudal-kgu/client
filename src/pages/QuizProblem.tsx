import styled from 'styled-components';

import PageContainer from '../components/common/PageContainer';
import Spinner from '../components/common/Spinner';
import CircularTimer from '../components/quiz/CircularTimer';
import useQuizNavigation from '../hooks/useQuizNavigation';
import useQuizProblem from '../hooks/useQuizProblem';
import useTimer from '../hooks/useTimer';

const QuizProblem = () => {
    const {
        problem,
        isLoading,
        sortedChoices,
        selectedChoiceId,
        setSelectedChoiceId,
        isAlreadyAnswered,
    } = useQuizProblem();
    const { displaySeconds, ratio, isExpired } = useTimer(problem?.expiredAt);
    const canSelect = !isExpired && !isAlreadyAnswered;
    const { currentIndex, totalCount, progress, isLast, canGoNext, isProcessing, handleNext } =
        useQuizNavigation({ isExpired, isAlreadyAnswered, selectedChoiceId });

    return (
        <PageContainer>
            <StyledContainer>
                <div className="progress-header">
                    <span className="count">
                        퀴즈 {currentIndex >= 0 ? currentIndex + 1 : '-'}/{totalCount || '-'}
                    </span>
                    <CircularTimer
                        displaySeconds={displaySeconds}
                        ratio={ratio}
                        isExpired={isExpired}
                    />
                </div>

                <ProgressBar $progress={progress} />

                {isLoading ? (
                    <div className="loading">
                        <Spinner />
                    </div>
                ) : problem ? (
                    <>
                        <p className="question">{problem.description}</p>

                        <div className="choices">
                            {sortedChoices.map((choice, idx) => (
                                <ChoiceItem
                                    key={choice.id}
                                    $selected={selectedChoiceId === choice.id}
                                    $disabled={!canSelect}
                                    $answered={isAlreadyAnswered}
                                    onClick={() => canSelect && setSelectedChoiceId(choice.id)}
                                >
                                    <span className="number">
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <span className="text">{choice.description}</span>
                                    <div
                                        className={`radio${selectedChoiceId === choice.id ? ' checked' : ''}`}
                                    />
                                </ChoiceItem>
                            ))}
                        </div>
                    </>
                ) : null}
            </StyledContainer>

            <StyledFooter>
                <NextButton onClick={handleNext} disabled={!canGoNext || isProcessing}>
                    {isLast ? '완료' : '다음'}
                </NextButton>
            </StyledFooter>
        </PageContainer>
    );
};

const StyledContainer = styled.div`
    padding: 16px 16px 140px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .progress-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .count {
            font-size: 14px;
            font-weight: 600;
            color: ${({ theme }) => theme.colors.black_op_70};
        }
    }

    .loading {
        display: flex;
        justify-content: center;
        padding: 48px 0;
    }

    .question {
        font-size: 18px;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.black};
        line-height: 1.5;
    }

    .choices {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
`;

const ProgressBar = styled.div<{ $progress: number }>`
    width: 100%;
    height: 8px;
    border-radius: 99px;
    background-color: ${({ theme }) => theme.colors.primary200};

    &::after {
        content: '';
        display: block;
        width: ${({ $progress }) => $progress}%;
        height: 100%;
        border-radius: 99px;
        background-color: ${({ theme }) => theme.colors.primary700};
        transition: width 0.3s ease;
    }
`;

const ChoiceItem = styled.div<{ $selected: boolean; $disabled: boolean; $answered: boolean }>`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    border-radius: 12px;
    background-color: ${({ theme, $selected, $answered }) =>
        $selected && $answered ? theme.colors.primary200 : theme.colors.primary100};
    opacity: ${({ $disabled, $selected, $answered }) =>
        !$disabled ? 1 : $answered && $selected ? 1 : 0.45};
    cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
    pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
    transition:
        background-color 0.15s,
        opacity 0.2s;

    .number {
        font-size: 14px;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.primary800};
        min-width: 24px;
    }

    .text {
        flex: 1;
        font-size: 14px;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.black};
        line-height: 1.5;
    }

    .radio {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: 2px solid ${({ theme }) => theme.colors.primary400};
        flex-shrink: 0;

        &.checked {
            border-color: ${({ theme }) => theme.colors.primary700};
            background-color: ${({ theme }) => theme.colors.primary700};
            box-shadow: inset 0 0 0 4px ${({ theme }) => theme.colors.white};
        }
    }
`;

const StyledFooter = styled.div`
    padding: 16px;
    width: 100%;
    max-width: 530px;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(to top, ${({ theme }) => theme.colors.background} 80%, transparent);
`;

const NextButton = styled.button`
    width: 100%;
    height: 52px;
    border-radius: 64px;
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary700};
    opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
    transition: opacity 0.15s;
`;

export default QuizProblem;
