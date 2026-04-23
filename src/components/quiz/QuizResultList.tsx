import styled from 'styled-components';

import type { QuizQuestion } from '../../hooks/useQuiz';
import QuizResultItem from './QuizResultItem';

interface Props {
    questions: QuizQuestion[];
    selectedOptionIds: (number | null)[];
    correctCount: number;
}

const QuizResultList = ({ questions, selectedOptionIds, correctCount }: Props) => {
    return (
        <StyledContainer>
            <div className="header">
                <span className="title">결과</span>
                <span className="count">
                    {correctCount} / {questions.length}
                </span>
            </div>
            <div className="list">
                {questions.map((question, index) => (
                    <QuizResultItem
                        key={question.id}
                        question={question}
                        index={index}
                        selectedOptionId={selectedOptionIds[index]}
                    />
                ))}
            </div>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .title {
            font-size: 16px;
            font-weight: 600;
            color: ${({ theme }) => theme.colors.black};
        }

        .count {
            font-size: 13px;
            font-weight: 600;
            color: ${({ theme }) => theme.colors.primary700};
            background-color: ${({ theme }) => theme.colors.primary100};
            padding: 4px 10px;
            border-radius: 999px;
        }
    }

    .list {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
`;

export default QuizResultList;
