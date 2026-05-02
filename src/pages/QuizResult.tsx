import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import type { QuizProblem } from '../api/types';
import PageContainer from '../components/common/PageContainer';
import { type ResultProblemData } from '../components/quiz/QuizResultItem';
import QuizResultList from '../components/quiz/QuizResultList';
import QuizScoreSection from '../components/quiz/QuizScoreSection';
import type { QuizQuestion } from '../hooks/useQuiz';

interface LocationState {
    problems?: QuizProblem[];
    questions?: QuizQuestion[];
    selectedOptionIds?: (number | null)[];
    expiredIndices: boolean[];
}

const buildResultData = (
    problems: QuizProblem[],
    expiredIndices: boolean[],
): ResultProblemData[] => {
    return problems.map((problem, i) => {
        const isExpiredTimeout = expiredIndices[i] ?? false;
        const sortedChoices = [...problem.choices].sort((a, b) => a.order - b.order);

        const correctByIdMatch = sortedChoices.find((c) => c.id === problem.answer);
        const correctByOrderMatch = sortedChoices.find((c) => c.order === problem.answer);
        const correctChoice = correctByIdMatch ?? correctByOrderMatch;
        const correctOptionId = correctChoice?.id ?? problem.answer;
        const correctOptionText = correctChoice?.description ?? '(정답 정보 없음)';

        const rawChoice = isExpiredTimeout ? null : problem.choice || null;
        const userChoice = rawChoice ? sortedChoices.find((c) => c.id === rawChoice) : null;
        const userChoiceId = userChoice?.id ?? null;
        const userChoiceText = userChoice?.description ?? null;

        const isCorrect =
            !isExpiredTimeout && userChoiceId !== null && userChoiceId === correctOptionId;

        return {
            problemId: problem.problemId,
            description: problem.description,
            correctOptionId,
            correctOptionText,
            userChoiceId,
            userChoiceText,
            isCorrect,
            isExpiredTimeout,
        };
    });
};

const QuizResult = () => {
    const navigate = useNavigate();
    const { state } = useLocation() as { state: LocationState | null };

    if (!state) {
        return (
            <PageContainer>
                <StyledContainer>
                    <div className="content">
                        <div className="status-text">결과 데이터가 없습니다.</div>
                    </div>
                    <div className="footer">
                        <button className="home-btn" onClick={() => navigate('/')}>
                            메인 화면으로 돌아가기
                        </button>
                    </div>
                </StyledContainer>
            </PageContainer>
        );
    }

    const expiredIndices = state.expiredIndices ?? [];
    let resultData: ResultProblemData[];

    if (state.problems && state.problems.length > 0) {
        resultData = buildResultData(state.problems, expiredIndices);
    } else if (state.questions && state.selectedOptionIds) {
        resultData = state.questions.map((q, i) => {
            const isExpiredTimeout = expiredIndices[i] ?? false;
            const userChoiceId = isExpiredTimeout ? null : (state.selectedOptionIds![i] ?? null);
            const correctOption = q.options.find((o) => o.id === q.correctOptionId);
            const userOption = userChoiceId
                ? q.options.find((o) => o.id === userChoiceId)
                : undefined;
            const isCorrect =
                !isExpiredTimeout && userChoiceId !== null && userChoiceId === q.correctOptionId;

            return {
                problemId: q.id,
                description: q.question,
                correctOptionId: q.correctOptionId,
                correctOptionText: correctOption?.text ?? '(정답 정보 없음)',
                userChoiceId,
                userChoiceText: userOption?.text ?? null,
                isCorrect,
                isExpiredTimeout,
            };
        });
    } else {
        return (
            <PageContainer>
                <StyledContainer>
                    <div className="content">
                        <div className="status-text">결과 데이터가 없습니다.</div>
                    </div>
                    <div className="footer">
                        <button className="home-btn" onClick={() => navigate('/')}>
                            메인 화면으로 돌아가기
                        </button>
                    </div>
                </StyledContainer>
            </PageContainer>
        );
    }

    const correctCount = resultData.filter((r) => r.isCorrect).length;
    const earnedPoints = correctCount * 50;

    return (
        <PageContainer>
            <StyledContainer>
                <div className="content">
                    <QuizScoreSection totalPoints={9999} earnedPoints={earnedPoints} />
                    <QuizResultList resultData={resultData} correctCount={correctCount} />
                </div>
                <div className="footer">
                    <button className="home-btn" onClick={() => navigate('/')}>
                        메인 화면으로 돌아가기
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
        gap: 32px;
        overflow-y: auto;
    }

    .status-text {
        font-size: 15px;
        color: ${({ theme }) => theme.colors.black};
    }

    .footer {
        padding: 12px 24px 24px;
        background-color: ${({ theme }) => theme.colors.background};

        .home-btn {
            width: 100%;
            padding: 16px;
            border-radius: 64px;
            font-size: 16px;
            font-weight: 600;
            color: ${({ theme }) => theme.colors.white};
            background-color: ${({ theme }) => theme.colors.primary700};
        }
    }
`;

export default QuizResult;
