import styled from 'styled-components';

import CurrencyBar from './CurrencyBar';
import SideActions from './SideActions';

interface Currency {
    shell: number;
    gem: number;
    fuel: number;
}

interface Props {
    level: number;
    progress: number;
    maxProgress: number;
    currency: Currency;
}

const IslandView = ({ level, progress, maxProgress, currency }: Props) => {
    return (
        <StyledContainer>
            <img className="island-bg" src="/island.png" alt="섬" />

            <CurrencyBar currency={currency} />

            <div className="level-info">
                <span className="level-label">레벨</span>
                <span className="level-value">Lv.{level}</span>
                <span className="progress-label">진행도</span>
                <div className="progress-row">
                    {/* '진행 바'로 변경 예정 */}
                    <span className="dot" />
                    <span className="progress-text">
                        {progress}/{maxProgress}
                    </span>
                </div>
            </div>

            <div className="side-actions">
                <SideActions />
            </div>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    flex: 1;
    position: relative;
    overflow: hidden;

    .island-bg {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }

    .level-info {
        position: absolute;
        top: 60px;
        left: 16px;
        z-index: 2;
        background-color: rgba(255, 255, 255, 0.75);
        border-radius: 12px;
        padding: 8px 12px;
        display: flex;
        flex-direction: column;
        gap: 2px;
        backdrop-filter: blur(4px);

        .level-label,
        .progress-label {
            font-size: 11px;
            font-weight: 500;
            color: ${({ theme }) => theme.colors.primary800};
            opacity: 0.75;
        }

        .progress-label {
            margin-top: 4px;
        }

        .level-value {
            font-size: 22px;
            font-weight: 700;
            color: ${({ theme }) => theme.colors.primary800};
            line-height: 1.1;
        }

        .progress-row {
            display: flex;
            align-items: center;
            gap: 4px;

            .dot {
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: ${({ theme }) => theme.colors.primary700};
            }

            .progress-text {
                font-size: 14px;
                font-weight: 600;
                color: ${({ theme }) => theme.colors.primary800};
            }
        }
    }

    .side-actions {
        position: absolute;
        top: 60px;
        right: 16px;
        z-index: 2;
    }
`;

export default IslandView;
