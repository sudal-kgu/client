import { FaCheck } from 'react-icons/fa';
import styled from 'styled-components';

import type { AnalysisItem } from '../../api/types';

interface Props {
    item: AnalysisItem;
    isSelected: boolean;
    onSelect: () => void;
}

const BasketItem = ({ item, onSelect, isSelected }: Props) => {
    return (
        <StyledContainer onClick={onSelect} $isSelected={isSelected}>
            <div className="item">
                <img src={item.filename} />
                <div className="label">
                    <div className="category">{item.category}</div>
                    <div className="subcategory">{item.subcategory}</div>
                </div>
            </div>
            <div className="icon">{isSelected ? <FaCheck /> : <div />}</div>
        </StyledContainer>
    );
};

const StyledContainer = styled.div<{ $isSelected: boolean }>`
    padding: 12px 16px 12px 12px;
    display: flex;
    align-items: center;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.colors.primary200};
    box-shadow: ${({ theme }) => theme.shadows.default};

    .item {
        width: 100%;
        display: flex;
        gap: 16px;
        align-items: center;

        img {
            width: 62px;
            height: 62px;
            object-fit: cover;
            border-radius: 12px;
        }

        .label {
            .category {
                font-size: 16px;
                font-weight: 700;
                color: ${({ theme }) => theme.colors.black};
            }

            .subcategory {
                font-size: 12px;
                color: ${({ theme }) => theme.colors.primary800};
            }
        }
    }

    .icon {
        min-width: 32px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid ${({ theme }) => theme.colors.primary700};
        border-radius: 50%;
        color: ${({ theme }) => theme.colors.white};
        background-color: ${(props) =>
            props.$isSelected ? props.theme.colors.primary700 : props.theme.colors.white};
    }
`;

export default BasketItem;
