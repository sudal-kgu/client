import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import useIsland from '../../api/hooks/useIsland';

const LevelInfo = () => {
    const navigate = useNavigate();
    const { island } = useIsland();

    if (!island) return null;

    const totalPercent = Math.min(
        (island.cumulativeExp / island.nextLevel.totalRequiredExp) * 100,
        100,
    );

    return (
        <Panel>
            <LevelRow>
                <LevelLeft>
                    <LevelValue>Lv.{island.level}</LevelValue>
                    <IslandName>{island.nickname}</IslandName>
                </LevelLeft>
            </LevelRow>

            <ExpBar>
                <ExpFill style={{ width: `${totalPercent}%` }} />
            </ExpBar>

            <ExpFraction>
                {island.cumulativeExp.toLocaleString()}
                <ExpCap> / {island.nextLevel.totalRequiredExp.toLocaleString()} exp</ExpCap>
            </ExpFraction>

            <Divider />

            <ExpBreakdown>
                <ExpRow>
                    <ExpLabel>♻️ 분리배출</ExpLabel>
                    <ExpValue>
                        {island.recyclingContributionExp.toLocaleString()}
                        <ExpCap>
                            {' '}
                            / {island.nextLevel.recyclingExpLimit.toLocaleString()} exp
                        </ExpCap>
                    </ExpValue>
                </ExpRow>
                <ExpRow>
                    <ExpLabel>🧪 아이템</ExpLabel>
                    {island.nextLevel.recyclingExpLimit >= island.nextLevel.totalRequiredExp ? (
                        <ExpUnavailable>현재 레벨 불필요</ExpUnavailable>
                    ) : (
                        <ExpValue>{island.itemContributionExp.toLocaleString()} exp</ExpValue>
                    )}
                </ExpRow>
            </ExpBreakdown>

            <Divider />

            <ActionRow>
                <PrimaryButton onClick={() => navigate('/camera')}>쓰레기 줍기</PrimaryButton>
                <SecondaryButton onClick={() => navigate('/point-shop')}>상점</SecondaryButton>
                <SecondaryButton onClick={() => navigate('/ranking')}>랭킹</SecondaryButton>
            </ActionRow>
        </Panel>
    );
};

const Panel = styled.div`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 530px;
    z-index: 100;
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 22px 22px 0 0;
    padding: 14px 20px 24px;
`;

const LevelRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const LevelLeft = styled.div`
    display: flex;
    align-items: baseline;
    gap: 6px;
`;

const LevelValue = styled.span`
    font-size: 18px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary800};
    line-height: 1;
`;

const IslandName = styled.span`
    font-size: 12px;
    color: ${({ theme }) => theme.colors.primary800};
    opacity: 0.5;
`;

const ExpBar = styled.div`
    width: 100%;
    height: 6px;
    background: ${({ theme }) => theme.colors.primary300};
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 4px;
`;

const ExpFill = styled.div`
    height: 100%;
    background: linear-gradient(
        90deg,
        ${({ theme }) => theme.colors.primary700},
        ${({ theme }) => theme.colors.primary500}
    );
    border-radius: 4px;
    transition: width 0.4s ease;
`;

const ExpBreakdown = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    margin-bottom: 10px;
`;

const ExpRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ExpLabel = styled.span`
    font-size: 10px;
    color: ${({ theme }) => theme.colors.primary800};
    opacity: 0.5;
`;

const ExpValue = styled.span`
    font-size: 10px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary700};
`;

const ExpCap = styled.span`
    font-weight: 400;
    opacity: 0.6;
`;

const ExpFraction = styled.span`
    display: block;
    font-size: 10px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary700};
    text-align: right;
    margin-bottom: 8px;
`;

const ExpUnavailable = styled.span`
    font-size: 10px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.primary800};
    opacity: 0.35;
`;

const Divider = styled.div`
    height: 0.5px;
    background: ${({ theme }) => theme.colors.primary300};
    margin-bottom: 10px;
`;

const ActionRow = styled.div`
    display: flex;
    gap: 10px;
`;

const PrimaryButton = styled.button`
    flex: 2;
    padding: 11px;
    background: ${({ theme }) => theme.colors.primary700};
    border-radius: 14px;
    color: ${({ theme }) => theme.colors.white};
    font-size: 13px;
    font-weight: 500;
    transition: opacity 0.15s;

    &:active {
        opacity: 0.85;
    }
`;

const SecondaryButton = styled.button`
    flex: 1;
    padding: 11px;
    background: transparent;
    border: 1.5px solid ${({ theme }) => theme.colors.primary700};
    border-radius: 14px;
    color: ${({ theme }) => theme.colors.primary700};
    font-size: 13px;
    font-weight: 500;
    transition: opacity 0.15s;

    &:active {
        opacity: 0.85;
    }
`;

export default LevelInfo;
