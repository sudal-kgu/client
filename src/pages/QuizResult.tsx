import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import type { QuizChoice, QuizProblem } from '../api/types';
import PageContainer from '../components/common/PageContainer';
import { type ResultProblemData } from '../components/quiz/QuizResultItem';
import QuizResultList from '../components/quiz/QuizResultList';
import QuizScoreSection from '../components/quiz/QuizScoreSection';

const POINTS_PER_CORRECT = 50;

interface LocationState {
    problems: QuizProblem[];
    expiredIndices: boolean[];
}

const resolveCorrectOptionId = (answer: number, sortedChoices: QuizChoice[]): number => {
    const byId = sortedChoices.find((c) => c.id === answer);
    const byOrder = sortedChoices.find((c) => c.order === answer);
    return (byId ?? byOrder)?.id ?? answer;
};

const isServerExpired = (expiredAt: string | null): boolean => {
    if (!expiredAt) return false;
    return new Date(expiredAt).getTime() < Date.now();
};

const buildResultData = (problems: QuizProblem[], expiredIndices: boolean[]): ResultProblemData[] =>
    problems.map((problem, i) => {
        const sortedChoices = [...problem.choices].sort((a, b) => a.order - b.order);
        const correctOptionId = resolveCorrectOptionId(problem.answer, sortedChoices);
        const correctChoice = sortedChoices.find((c) => c.id === correctOptionId);
        const correctOptionText = correctChoice?.description ?? '(정답 정보 없음)';

        const isExpiredTimeout =
            (expiredIndices[i] ?? false) ||
            (problem.choice == null && isServerExpired(problem.expiredAt));

        const userChoiceId = isExpiredTimeout ? null : (problem.choice ?? null);
        const userChoice =
            userChoiceId != null ? sortedChoices.find((c) => c.id === userChoiceId) : undefined;
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

const QuizResult = () => {
    const navigate = useNavigate();
    const { state } = useLocation() as { state: LocationState | null };

    const renderEmpty = () => (
        <PageContainer>
            <StyledContainer>
                <div className="content">
                    <div className="status-text">결과 데이터가 없습니다.</div>
                </div>
                <div className="footer">
                    <button type="button" className="home-btn" onClick={() => navigate('/')}>
                        메인 화면으로 돌아가기
                    </button>
                </div>
            </StyledContainer>
        </PageContainer>
    );

    if (!state || !state.problems || state.problems.length === 0) return renderEmpty();

    const resultData = buildResultData(state.problems, state.expiredIndices ?? []);
    const correctCount = resultData.filter((r) => r.isCorrect).length;
    const earnedPoints = correctCount * POINTS_PER_CORRECT;

    return (
        <PageContainer>
            <StyledContainer>
                <div className="content">
                    <QuizScoreSection totalPoints={earnedPoints} earnedPoints={earnedPoints} />
                    <QuizResultList resultData={resultData} correctCount={correctCount} />
                </div>
                <div className="footer">
                    <button type="button" className="home-btn" onClick={() => navigate('/')}>
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
