import styled from 'styled-components';

import type { Item } from '../../api/types';
import cn from '../../utils/cn';

interface Props {
    item: Item;
    onAction: (itemId: number) => void;
}

const ShopItemCard = ({ item, onAction }: Props) => {
    const isDisabled = !item.purchasable || item.currentCount >= item.maxCount;
    const isMaxed = item.currentCount >= item.maxCount;

    return (
        <StyledContainer className={cn({ disabled: isDisabled })}>
            <Icon src={item.iconUri} alt={item.name} />
            <Info>
                <div className="name">
                    {item.name}
                    {item.unlockLevel > 0 && <LevelBadge>Lv.{item.unlockLevel}</LevelBadge>}
                </div>
                <div className="meta">
                    <span className="exp">+{item.expReward.toLocaleString()} exp</span>
                    <span className="count">
                        {item.currentCount} / {item.maxCount}회
                    </span>
                </div>
            </Info>

            <Action>
                <div className="cost">
                    <span>🐚</span>
                    <span className="cost-value">{item.price.toLocaleString()}</span>
                </div>
                <ActionButton disabled={isDisabled} onClick={() => onAction(item.itemId)}>
                    {isMaxed ? '완료' : !item.purchasable ? '잠김' : '정화하기'}
                </ActionButton>
            </Action>
        </StyledContainer>
    );
};

const Icon = styled.img`
    width: 48px;
    height: 48px;
    object-fit: contain;
    flex-shrink: 0;
`;

const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 14px;

    &.disabled {
        opacity: 0.5;
    }
`;

const Info = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;

    .name {
        font-size: 14px;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.primary800};
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .meta {
        display: flex;
        align-items: center;
        gap: 8px;

        .exp {
            font-size: 12px;
            font-weight: 600;
            color: ${({ theme }) => theme.colors.primary700};
        }

        .count {
            font-size: 11px;
            color: ${({ theme }) => theme.colors.black_op_70};
        }
    }
`;

const LevelBadge = styled.span`
    font-size: 10px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary700};
    background-color: ${({ theme }) => theme.colors.primary200};
    padding: 1px 6px;
    border-radius: 8px;
`;

const Action = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;

    .cost {
        display: flex;
        align-items: center;
        gap: 3px;

        font-size: 13px;

        .cost-value {
            font-size: 12px;
            font-weight: 600;
            color: ${({ theme }) => theme.colors.primary800};
        }
    }
`;

const ActionButton = styled.button`
    padding: 6px 14px;
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
`;

export default ShopItemCard;
