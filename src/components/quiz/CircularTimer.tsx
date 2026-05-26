import styled from 'styled-components';

const SIZE = 40;
const STROKE = 3;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface Props {
    displaySeconds: number;
    ratio: number;
    isExpired: boolean;
}

const CircularTimer = ({ displaySeconds, ratio, isExpired }: Props) => {
    const strokeDashoffset = CIRCUMFERENCE * (1 - ratio);

    return (
        <StyledContainer $expired={isExpired}>
            <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
                <circle
                    cx={SIZE / 2}
                    cy={SIZE / 2}
                    r={RADIUS}
                    fill="none"
                    strokeWidth={STROKE}
                    className="track"
                />
                <circle
                    cx={SIZE / 2}
                    cy={SIZE / 2}
                    r={RADIUS}
                    fill="none"
                    strokeWidth={STROKE}
                    className="arc"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
                />
            </svg>
            <span className="label">{isExpired ? '만료' : displaySeconds}</span>
        </StyledContainer>
    );
};

const StyledContainer = styled.div<{ $expired: boolean }>`
    position: relative;
    width: ${SIZE}px;
    height: ${SIZE}px;
    flex-shrink: 0;

    .track {
        stroke: ${({ theme }) => theme.colors.primary200};
    }

    .arc {
        stroke: ${({ theme, $expired }) =>
            $expired ? theme.colors.badge : theme.colors.primary700};
    }

    .label {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${({ $expired }) => ($expired ? 8 : 11)}px;
        font-weight: 700;
        color: ${({ theme, $expired }) =>
            $expired ? theme.colors.badge : theme.colors.primary700};
    }
`;

export default CircularTimer;
