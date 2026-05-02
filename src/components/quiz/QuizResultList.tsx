import styled from 'styled-components';

import QuizResultItem, { type ResultProblemData } from './QuizResultItem';

interface Props {
    resultData: ResultProblemData[];
    correctCount: number;
}

const QuizResultList = ({ resultData, correctCount }: Props) => {
    return (
        <StyledContainer>
            <div className="result-header">
                <span className="result-title">결과</span>
                <span className="result-count">
                    {correctCount} / {resultData.length}
                </span>
            </div>
            <div className="result-list">
                {resultData.map((item, index) => (
                    <QuizResultItem key={item.problemId} item={item} index={index} />
                ))}
            </div>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    .result-header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .result-title {
            font-size: 16px;
            font-weight: 600;
            color: ${({ theme }) => theme.colors.black};
        }
        .result-count {
            font-size: 13px;
            font-weight: 600;
            color: ${({ theme }) => theme.colors.primary700};
            background-color: ${({ theme }) => theme.colors.primary100};
            padding: 4px 10px;
            border-radius: 999px;
        }
    }

    .result-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
`;

export default QuizResultList;
