import { FaTrashAlt } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';
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
            {loading > 0 && (
                <StyledLoadingBar>
                    <ImSpinner2 className="spinner" />
                    <span>{loading < 100 ? loading : '99+'}개의 요청을 분석중입니다.</span>
                </StyledLoadingBar>
            )}
            {items.length > 0 && (
                <StyledBasketBar onClick={() => navigate('/camera/basket')}>
                    <div className="icon-wrap">
                        <FaTrashAlt className="basket-icon" />
                    </div>
                    <div className="divider" />
                    <span className="label">
                        바구니에 {items.length < 100 ? items.length : '99+'}개의 쓰레기가
                        들어있습니다.
                    </span>
                </StyledBasketBar>
            )}
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    gap: 8px;
    flex-direction: column;
    align-items: center;
    position: absolute;
    bottom: 156px;
    left: 50%;
    transform: translateX(-50%);
`;

const StyledLoadingBar = styled.div`
    width: 158px;
    height: 30px;
    display: flex;
    gap: 6px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.white}E6;
    box-shadow: ${({ theme }) => theme.shadows.default};

    span {
        font-size: 10px;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.black};
        white-space: nowrap;
    }

    .spinner {
        font-size: 12px;
        flex-shrink: 0;
        color: ${({ theme }) => theme.colors.primary700};

        @keyframes loop {
            0% {
                transform: rotateZ(0deg);
            }

            100% {
                transform: rotateZ(360deg);
            }
        }

        animation: loop ease-in-out 1s infinite;
    }
`;

const StyledBasketBar = styled.button`
    width: 296px;
    height: 64px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.white}E6;
    box-shadow: ${({ theme }) => theme.shadows.default};
    overflow: hidden;

    &:active {
        opacity: 0.8;
    }

    .icon-wrap {
        flex-shrink: 0;
        margin: 8px 0 8px 8px;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        background-color: ${({ theme }) => theme.colors.primary100};
    }

    .basket-icon {
        font-size: 24px;
        color: ${({ theme }) => theme.colors.primary700};
    }

    .divider {
        flex-shrink: 0;
        margin-left: 8px;
        width: 1px;
        height: 36px;
        background-color: ${({ theme }) => theme.colors.primary300};
    }

    .label {
        flex: 1;
        padding: 0 12px;
        font-size: 12px;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.black};
        text-align: left;
    }
`;

export default CameraControls;
