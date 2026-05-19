import { useEffect, useState } from 'react';

import styled from 'styled-components';

import type { KoreaMapData, RegionPath } from '../../api/types';
import { REGION_LABELS, Region } from '../../api/types';
import cn from '../../utils/cn';

interface Props {
    selected: Region | null;
    onSelect: (region: Region | null) => void;
}

const LABEL_POS_OVERRIDE: Partial<Record<Region, { cx: number; cy: number }>> = {
    [Region.SEOUL]: { cx: 130, cy: 138 },
    [Region.GYEONGGI]: { cx: 140, cy: 158 },
};

const KoreaMap = ({ selected, onSelect }: Props) => {
    const [mapData, setMapData] = useState<KoreaMapData | null>(null);

    useEffect(() => {
        fetch('/korea-regions.json')
            .then((r) => r.json())
            .then(setMapData);
    }, []);

    if (!mapData) return <Placeholder />;

    return (
        <StyledSvg viewBox={`0 0 ${mapData.width} ${mapData.height}`}>
            {(Object.entries(mapData.regions) as [Region, RegionPath][]).map(([region, { d }]) => (
                <path
                    key={region}
                    d={d}
                    className={cn('province', selected === region && 'selected')}
                    onClick={() => onSelect(selected === region ? null : region)}
                    style={{ cursor: 'pointer' }}
                />
            ))}
            {(Object.entries(mapData.regions) as [Region, RegionPath][]).map(
                ([region, { cx, cy }]) => {
                    const labelPos = LABEL_POS_OVERRIDE[region] ?? { cx, cy };
                    return (
                        <text
                            key={region}
                            x={labelPos.cx}
                            y={labelPos.cy}
                            className={cn('label', selected === region && 'selected')}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{ pointerEvents: 'none' }}
                        >
                            {REGION_LABELS[region]}
                        </text>
                    );
                },
            )}
        </StyledSvg>
    );
};

const Placeholder = styled.div`
    width: 100%;
    aspect-ratio: 4 / 5;
`;

const StyledSvg = styled.svg`
    width: 100%;
    height: auto;
    overflow: visible;

    .province {
        fill: ${({ theme }) => theme.colors.primary200};
        stroke: ${({ theme }) => theme.colors.white};
        stroke-width: 1;
        transition: fill 0.15s;

        &:hover {
            fill: ${({ theme }) => theme.colors.primary300};
        }

        &.selected {
            fill: ${({ theme }) => theme.colors.primary500};
        }
    }

    .label {
        font-size: 12px;
        font-weight: 600;
        fill: ${({ theme }) => theme.colors.primary800};
        pointer-events: none;
        user-select: none;

        &.selected {
            fill: ${({ theme }) => theme.colors.primary300};
        }
    }
`;

export default KoreaMap;
