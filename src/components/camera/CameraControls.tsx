import { ImSpinner2 } from 'react-icons/im';
import { MdOutlineShoppingBasket } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import type { AnalysisItem } from '../../api/types';
import type { Analysis } from '../../hooks/types';

interface Props {
    items: AnalysisItem[];
    analysis: Analysis;
}

const CameraControls = ({ items, analysis }: Props) => {
    const loading = Object.keys(analysis).length;
    const navigate = useNavigate();

    return (
        <StyledContainer>
            <StyledButton
                className="basket"
                $number={items.length}
                onClick={() => navigate('/capture/basket')}
            >
                <MdOutlineShoppingBasket className="basket" />
            </StyledButton>
            {loading > 0 && (
                <StyledButton className="loading blur" $number={loading}>
                    <ImSpinner2 className="spinner" />
                </StyledButton>
            )}
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    gap: 24px;
    flex-direction: column;
    position: absolute;
    top: 36px;
    right: 36px;
`;

const StyledButton = styled.button<{ $number: number }>`
    padding: 8px;
    width: 48px;
    height: 48px;
    font-size: 32px;
    color: ${({ theme }) => theme.colors.primary700};
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.white};
    position: relative;

    &:active {
        opacity: 0.8;
    }

    &.blur {
        opacity: 0.7;
        pointer-events: none;
    }

    .spinner {
        @keyframes loop {
            0% {
                transform: rotateZ(0deg);
            }

            100% {
                transform: rotateZ(360deg);
            }
        }
        font-size: 32px;
        color: ${({ theme }) => theme.colors.primary700};
        animation: loop ease-in-out 1s infinite;
    }

    &::after {
        content: ${(props) => `"${props.$number < 100 ? props.$number : '99+'}"`};
        padding-top: 2px;
        display: ${(props) => (props.$number > 0 ? 'flex' : 'none')};
        justify-content: center;
        align-items: center;
        width: 24px;
        height: 24px;
        font-size: 12px;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.white};
        border: 2px solid ${({ theme }) => theme.colors.white};
        border-radius: 50%;
        background-color: ${({ theme }) => theme.colors.badge};
        position: absolute;
        top: -8px;
        right: -8px;
    }
`;

export default CameraControls;
