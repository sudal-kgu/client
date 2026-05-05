import { ImSpinner2 } from 'react-icons/im';
import styled from 'styled-components';

interface Props {
    size?: number;
}

const Spinner = ({ size = 32 }: Props) => {
    return (
        <StyledContainer $size={size}>
            <ImSpinner2 className="spinner" />
        </StyledContainer>
    );
};

const StyledContainer = styled.div<{ $size: number }>`
    height: ${({ $size }) => $size}px;

    .spinner {
        @keyframes loop {
            0% {
                transform: rotateZ(0deg);
            }
            100% {
                transform: rotateZ(360deg);
            }
        }
        font-size: ${({ $size }) => $size}px;
        color: ${({ theme }) => theme.colors.primary700};
        animation: loop ease-in-out 1s infinite;
    }
`;

export default Spinner;
