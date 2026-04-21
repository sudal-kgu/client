import styled from 'styled-components';

import type { ShopItem } from './shopData';

interface Props {
    item: ShopItem;
    costIcon: string;
    buttonLabel: string;
    onAction: (id: number) => void;
}

const ShopItemCard = ({ item, costIcon, buttonLabel, onAction }: Props) => {
    return (
        <StyledContainer className={item.locked ? 'locked' : ''}>
            <div className="thumbnail">
                <span>{item.imageEmoji}</span>
            </div>

            <div className="info">
                <div className="name">
                    {item.name}
                    {item.requiredLevel && (
                        <span className="level-badge">Lv.{item.requiredLevel}</span>
                    )}
                </div>
                <div className="desc">{item.description}</div>
            </div>

            <div className="action">
                <div className="cost">
                    <span className="cost-icon">{costIcon}</span>
                    <span className="cost-value">{item.cost.toLocaleString()}</span>
                </div>
                <button disabled={item.locked} onClick={() => onAction(item.id)}>
                    {item.locked ? '잠김' : buttonLabel}
                </button>
            </div>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 12px;
    box-shadow: ${({ theme }) => theme.shadows.default};

    &.locked {
        opacity: 0.5;
    }

    .thumbnail {
        width: 56px;
        height: 56px;
        min-width: 56px;
        border-radius: 10px;
        background-color: ${({ theme }) => theme.colors.primary200};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26px;
    }

    .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 4px;

        .name {
            font-size: 14px;
            font-weight: 700;
            color: ${({ theme }) => theme.colors.primary800};
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .level-badge {
            font-size: 10px;
            font-weight: 600;
            color: ${({ theme }) => theme.colors.primary700};
            background-color: ${({ theme }) => theme.colors.primary200};
            padding: 1px 6px;
            border-radius: 8px;
        }

        .desc {
            font-size: 12px;
            color: ${({ theme }) => theme.colors.black_op_70};
            line-height: 1.4;
        }
    }

    .action {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        flex-shrink: 0;

        .cost {
            display: flex;
            align-items: center;
            gap: 3px;

            .cost-icon {
                font-size: 13px;
            }

            .cost-value {
                font-size: 12px;
                font-weight: 600;
                color: ${({ theme }) => theme.colors.primary800};
            }
        }

        button {
            padding: 6px 12px;
            border-radius: 20px;
            background-color: ${({ theme }) => theme.colors.primary400};
            color: ${({ theme }) => theme.colors.primary800};
            font-size: 12px;
            font-weight: 700;
            white-space: nowrap;
            transition: background-color 0.15s ease;

            &:hover:not(:disabled) {
                background-color: ${({ theme }) => theme.colors.primary500};
                color: ${({ theme }) => theme.colors.white};
            }

            &:disabled {
                background-color: ${({ theme }) => theme.colors.primary300};
                color: ${({ theme }) => theme.colors.black_op_70};
                cursor: not-allowed;
            }
        }
    }
`;

export default ShopItemCard;
