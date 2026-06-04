import { useState } from 'react';

import { MdDeleteOutline, MdLeaderboard, MdOutlineStorefront } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import useIsland from '../../api/hooks/useIsland';

const LevelInfo = () => {
    const navigate = useNavigate();
    const { island } = useIsland();
    const [expanded, setExpanded] = useState(false);

    if (!island) return null;

    const { nextLevel } = island;
    const totalPercent = nextLevel
        ? Math.min((island.cumulativeExp / nextLevel.totalRequiredExp) * 100, 100)
        : 100;

    if (!expanded) {
        return (
            <FloatButton onClick={() => setExpanded(true)}>
                <HandleBar />
                <FloatContent>
                    <FloatLevelGroup>
                        <FloatLevel>Lv.{island.level}</FloatLevel>
                        <FloatExpBar>
                            <FloatExpFill style={{ width: `${totalPercent}%` }} />
                        </FloatExpBar>
                    </FloatLevelGroup>
                    <FloatActions>
                        <FloatIconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate('/camera');
                            }}
                        >
                            <MdDeleteOutline size={22} />
                        </FloatIconButton>
                        <FloatIconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate('/point-shop');
                            }}
                        >
                            <MdOutlineStorefront size={22} />
                        </FloatIconButton>
                        <FloatIconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate('/ranking');
                            }}
                        >
                            <MdLeaderboard size={22} />
                        </FloatIconButton>
                    </FloatActions>
                </FloatContent>
            </FloatButton>
        );
    }

    return (
        <Panel>
            <PanelHandle onClick={() => setExpanded(false)} />
            <LevelRow>
                <LevelLeft>
                    <LevelValue>Lv.{island.level}</LevelValue>
                    <IslandName>{island.nickname}</IslandName>
                </LevelLeft>
            </LevelRow>

            <ExpBar>
                <ExpFill style={{ width: `${totalPercent}%` }} />
            </ExpBar>

            {nextLevel ? (
                <>
                    <ExpFraction>
                        {island.cumulativeExp.toLocaleString()}
                        <ExpCap> / {nextLevel.totalRequiredExp.toLocaleString()} exp</ExpCap>
                    </ExpFraction>

                    <Divider />

                    <ExpBreakdown>
                        <ExpRow>
                            <ExpLabel>♻️ 분리배출</ExpLabel>
                            <ExpValue>
                                {island.recyclingContributionExp.toLocaleString()}
                                <ExpCap>
                                    {' '}
                                    / {nextLevel.recyclingExpLimit.toLocaleString()} exp
                                </ExpCap>
                            </ExpValue>
                        </ExpRow>
                        <ExpRow>
                            <ExpLabel>🧪 아이템</ExpLabel>
                            {nextLevel.recyclingExpLimit >= nextLevel.totalRequiredExp ? (
                                <ExpUnavailable>현재 레벨 불필요</ExpUnavailable>
                            ) : (
                                <ExpValue>
                                    {island.itemContributionExp.toLocaleString()} exp
                                </ExpValue>
                            )}
                        </ExpRow>
                    </ExpBreakdown>
                </>
            ) : (
                <ExpFraction>최대 레벨</ExpFraction>
            )}

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
    padding: 8px 20px 24px;
`;

const PanelHandle = styled.div`
    width: 36px;
    height: 4px;
    background: ${({ theme }) => theme.colors.primary300};
    border-radius: 999px;
    margin: 0 auto 12px;
    cursor: pointer;
`;

const FloatButton = styled.button`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 530px;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 6px;
    padding: 8px 20px 16px;
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 22px 22px 0 0;
    box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.08);
    transition: opacity 0.15s;

    &:active {
        opacity: 0.85;
    }
`;

const HandleBar = styled.div`
    width: 36px;
    height: 4px;
    background: ${({ theme }) => theme.colors.primary300};
    border-radius: 999px;
    align-self: center;
`;

const FloatContent = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const FloatLevelGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
    margin-right: 12px;
`;

const FloatLevel = styled.span`
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary700};
    text-align: left;
`;

const FloatExpBar = styled.div`
    width: 100%;
    height: 4px;
    background: ${({ theme }) => theme.colors.primary300};
    border-radius: 999px;
    overflow: hidden;
`;

const FloatExpFill = styled.div`
    height: 100%;
    background: linear-gradient(
        90deg,
        ${({ theme }) => theme.colors.primary700},
        ${({ theme }) => theme.colors.primary500}
    );
    border-radius: 999px;
    transition: width 0.4s ease;
`;

const FloatActions = styled.div`
    display: flex;
    gap: 4px;
`;

const FloatIconButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    background: ${({ theme }) => theme.colors.primary100};
    border-radius: 12px;
    color: ${({ theme }) => theme.colors.primary700};
    transition: opacity 0.15s;

    &:active {
        opacity: 0.7;
    }
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
