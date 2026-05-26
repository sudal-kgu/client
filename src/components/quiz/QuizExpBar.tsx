import { useEffect, useState } from 'react';

import styled from 'styled-components';

import type { Island } from '../../api/types';

interface Props {
    island: Island;
    earnedExp: number;
}

const QuizExpBar = ({ island, earnedExp }: Props) => {
    const maxExp = island.nextLevel.totalRequiredExp;
    const prevPercent = Math.min(
        100,
        Math.max(0, ((island.cumulativeExp - earnedExp) / maxExp) * 100),
    );
    const currentPercent = Math.min(100, (island.cumulativeExp / maxExp) * 100);

    const [displayPercent, setDisplayPercent] = useState(prevPercent);

    useEffect(() => {
        const timer = setTimeout(() => setDisplayPercent(currentPercent), 150);
        return () => clearTimeout(timer);
    }, [currentPercent]);

    return (
        <StyledContainer>
            <div className="header">
                <span className="level">Lv.{island.level}</span>
                <EarnedBadge>+{earnedExp.toLocaleString()} EXP</EarnedBadge>
            </div>

            <Bar>
                <Fill $percent={displayPercent} />
            </Bar>

            <div className="fraction">
                <span className="current">{island.cumulativeExp.toLocaleString()}</span>
                <span className="max"> / {maxExp.toLocaleString()} exp</span>
            </div>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .level {
            font-size: 14px;
            font-weight: 600;
            color: ${({ theme }) => theme.colors.primary800};
        }
    }

    .fraction {
        text-align: right;
        font-size: 11px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.primary700};

        .max {
            font-weight: 400;
            opacity: 0.6;
        }
    }
`;

const Bar = styled.div`
    width: 100%;
    height: 8px;
    background: ${({ theme }) => theme.colors.primary300};
    border-radius: 99px;
    overflow: hidden;
`;

const Fill = styled.div<{ $percent: number }>`
    height: 100%;
    width: ${({ $percent }) => $percent}%;
    background: linear-gradient(
        90deg,
        ${({ theme }) => theme.colors.primary700},
        ${({ theme }) => theme.colors.primary500}
    );
    border-radius: 99px;
    transition: width 1.2s ease-out;
`;

const EarnedBadge = styled.span`
    padding: 3px 10px;
    border-radius: 99px;
    background-color: ${({ theme }) => theme.colors.primary400};
    font-size: 12px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary800};
`;

export default QuizExpBar;
