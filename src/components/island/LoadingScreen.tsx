import styled, { keyframes } from 'styled-components';

import useSceneReady from '../../hooks/store/useSceneReady';

const LoadingScreen = () => {
    const { ready } = useSceneReady();

    if (ready) return null;

    return (
        <Overlay>
            <WaveBars>
                {[0, 1, 2, 3, 4].map((i) => (
                    <Bar key={i} $delay={-(i * 0.2)} />
                ))}
            </WaveBars>
        </Overlay>
    );
};

const barAnim = keyframes`
    0%, 100% { transform: scaleY(0.25); opacity: 0.4; }
    50%       { transform: scaleY(1);    opacity: 0.85; }
`;

const Overlay = styled.div`
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, #185e27 0%, #286c34 55%, #4d6554 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    pointer-events: none;
`;

const WaveBars = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    height: 40px;
`;

const Bar = styled.div<{ $delay: number }>`
    width: 5px;
    height: 100%;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.75);
    transform-origin: center;
    animation: ${barAnim} 1s ease-in-out infinite;
    animation-delay: ${({ $delay }) => $delay}s;
`;

export default LoadingScreen;
