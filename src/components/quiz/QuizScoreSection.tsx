import styled from 'styled-components';

interface Props {
    earnedShell: number;
    earnedFuel: number;
    earnedExp: number;
    rewardFailed?: boolean;
}

const QuizScoreSection = ({ earnedShell, earnedFuel, earnedExp, rewardFailed = false }: Props) => {
    return (
        <StyledContainer>
            {rewardFailed && <div className="reward-error">보상 정보를 불러오지 못했습니다.</div>}
            <div className="reward-cards">
                <div className="reward-card">
                    <div className="icon-circle">🐚</div>
                    <div className="reward-label">조개</div>
                    <div className="reward-value">+{earnedShell}</div>
                </div>
                <div className="reward-card">
                    <div className="icon-circle">⛽</div>
                    <div className="reward-label">연료</div>
                    <div className="reward-value">+{earnedFuel}</div>
                </div>
            </div>
            <div className="exp-bar">+{earnedExp} EXP</div>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    .reward-error {
        font-size: 13px;
        color: ${({ theme }) => theme.colors.badge};
        text-align: center;
    }

    .reward-cards {
        display: flex;
        gap: 24px;
        width: 100%;

        .reward-card {
            flex: 1;
            background-color: ${({ theme }) => theme.colors.white};
            border-radius: 16px;
            padding: 20px 16px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            box-shadow: ${({ theme }) => theme.shadows.default};

            .icon-circle {
                width: 64px;
                height: 64px;
                border-radius: 50%;
                background-color: ${({ theme }) => theme.colors.primary200};
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 32px;
                line-height: 1;
            }

            .reward-label {
                font-size: 14px;
                font-weight: 500;
                color: ${({ theme }) => theme.colors.black_op_70};
            }

            .reward-value {
                font-size: 28px;
                font-weight: 700;
                color: ${({ theme }) => theme.colors.black};
                line-height: 1;
            }
        }
    }

    .exp-bar {
        background-color: ${({ theme }) => theme.colors.primary400};
        color: ${({ theme }) => theme.colors.primary700};
        font-size: 16px;
        font-weight: 700;
        padding: 10px 32px;
        border-radius: 999px;
        white-space: nowrap;
    }
`;

export default QuizScoreSection;
