import styled from 'styled-components';

interface Props {
    totalPoints: number;
    earnedPoints: number;
}

const QuizScoreSection = ({ totalPoints, earnedPoints }: Props) => {
    return (
        <StyledContainer>
            <div className="score-wrapper">
                <div className="points-badge">+{earnedPoints}</div>
                <div className="score-circle">
                    <div className="score-content">
                        <span className="score-number">{totalPoints}</span>
                        <span className="score-unit">pt</span>
                    </div>
                </div>
            </div>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 24px;

    .score-wrapper {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    .points-badge {
        position: absolute;
        top: -20px;
        right: -36px;
        background-color: ${({ theme }) => theme.colors.primary200};
        color: ${({ theme }) => theme.colors.primary700};
        font-size: 16px;
        font-weight: 700;
        padding: 6px 16px;
        border-radius: 12px;
        white-space: nowrap;
        z-index: 1;
    }

    .score-circle {
        width: 180px;
        height: 180px;
        border-radius: 50%;
        background-color: ${({ theme }) => theme.colors.white};
        border: 10px solid ${({ theme }) => theme.colors.primary200};
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .score-content {
        display: flex;
        align-items: baseline;

        .score-number {
            font-size: 48px;
            font-weight: 700;
            color: ${({ theme }) => theme.colors.primary700};
            line-height: 1;
        }

        .score-unit {
            font-size: 16px;
            font-weight: 500;
            color: ${({ theme }) => theme.colors.primary700};
            margin-left: 2px;
        }
    }
`;

export default QuizScoreSection;
