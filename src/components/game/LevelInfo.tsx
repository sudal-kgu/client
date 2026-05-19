import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import type { IslandInfo } from '../../api/types';

type Props = IslandInfo;

const LevelInfo = ({
    level,
    islandName,
    recycleExp,
    recycleExpCap,
    recycleCount,
    recycleCountMax,
}: Props) => {
    const navigate = useNavigate();
    const expPercent = Math.min((recycleExp / recycleExpCap) * 100, 100);

    return (
        <Panel>
            <LevelRow>
                <LevelLeft>
                    <LevelValue>Lv.{level}</LevelValue>
                    <IslandName>{islandName}</IslandName>
                </LevelLeft>
                <RecycleCount>
                    분리배출 {recycleCount} / {recycleCountMax}회
                </RecycleCount>
            </LevelRow>

            <ExpBar>
                <ExpFill style={{ width: `${expPercent}%` }} />
            </ExpBar>

            <ExpLabels>
                <ExpText>
                    분리배출 기여 {recycleExp.toLocaleString()} / {recycleExpCap.toLocaleString()}{' '}
                    exp
                </ExpText>
                {level < 3 && <ExpHint>Lv.2까지 아이템 불필요</ExpHint>}
            </ExpLabels>

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

const RecycleCount = styled.span`
    font-size: 11px;
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

const ExpLabels = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const ExpText = styled.span`
    font-size: 10px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary700};
`;

const ExpHint = styled.span`
    font-size: 10px;
    color: ${({ theme }) => theme.colors.primary800};
    opacity: 0.4;
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
