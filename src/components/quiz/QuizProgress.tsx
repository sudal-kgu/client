import styled from 'styled-components';

interface Props {
    current: number;
    total: number;
    percent: number;
}

const QuizProgress = ({ current, total, percent }: Props) => {
    return (
        <StyledContainer>
            <div className="label">
                <span className="current">퀴즈 {current}</span>
                <span className="total"> / {total}</span>
                <span className="percent">{percent}%</span>
            </div>
            <div className="bar-track">
                <div className="bar-fill" style={{ width: `${percent}%` }} />
            </div>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    .label {
        display: flex;
        align-items: baseline;

        .current {
            font-size: 14px;
            font-weight: 600;
            color: ${({ theme }) => theme.colors.primary500};
        }

        .total {
            font-size: 14px;
            font-weight: 400;
            color: ${({ theme }) => theme.colors.black_op_70};
        }

        .percent {
            margin-left: auto;
            font-size: 13px;
            font-weight: 600;
            color: ${({ theme }) => theme.colors.primary500};
        }
    }

    .bar-track {
        width: 100%;
        height: 8px;
        border-radius: 999px;
        background-color: ${({ theme }) => theme.colors.primary300};
        overflow: hidden;
    }

    .bar-fill {
        height: 100%;
        border-radius: 999px;
        background-color: ${({ theme }) => theme.colors.primary500};
        transition: width 0.3s ease;
    }
`;

export default QuizProgress;
