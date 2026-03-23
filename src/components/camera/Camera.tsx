import styled from 'styled-components';

import useCamera from '../../hooks/useCamera';

const Camera = () => {
    const { canvasRef, onCapture } = useCamera();

    return (
        <StyledContainer>
            <canvas ref={canvasRef} />
            <button onClick={onCapture}>
                <div className="outer"></div>
                <div className="inner"></div>
            </button>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    height: 100%;
    width: 100%;
    position: relative;

    canvas {
        display: block;
        width: 100%;
        height: 100%;
    }

    button {
        width: 84px;
        height: 84px;
        position: absolute;
        left: 50%;
        bottom: 48px;
        transform: translateX(-50%);

        div {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .outer {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: ${({ theme }) => theme.colors.white};
            opacity: 0.4;
        }

        .inner {
            width: 85%;
            height: 85%;
            border-radius: 50%;
            background-color: ${({ theme }) => theme.colors.white};

            &:active {
                opacity: 0.7;
            }
        }
    }
`;

export default Camera;
