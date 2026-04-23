import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import PageContainer from '../components/common/PageContainer';
import QuizResultList from '../components/quiz/QuizResultList';
import QuizScoreSection from '../components/quiz/QuizScoreSection';
import { type QuizQuestion } from '../hooks/useQuiz';

interface LocationState {
    questions: QuizQuestion[];
    selectedOptionIds: (number | null)[];
}

const QuizResult = () => {
    const navigate = useNavigate();
    const { state } = useLocation() as { state: LocationState };

    const { questions, selectedOptionIds } = state;

    const correctCount = questions.filter(
        (q, i) => q.correctOptionId === selectedOptionIds[i],
    ).length;

    const earnedPoints = correctCount * 50;

    return (
        <PageContainer>
            <StyledContainer>
                <div className="content">
                    <QuizScoreSection totalPoints={9999} earnedPoints={earnedPoints} />
                    <QuizResultList
                        questions={questions}
                        selectedOptionIds={selectedOptionIds}
                        correctCount={correctCount}
                    />
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
