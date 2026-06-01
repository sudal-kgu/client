import styled from 'styled-components';

import type { IGemItem } from '../../api/types';

interface Props {
    item: IGemItem;
    onAction: (gemItemId: number) => void;
}

const GemItemCard = ({ item, onAction }: Props) => {
    return (
        <StyledContainer>
            <Icon src={item.iconUri} alt={item.name} />
            <Info>
                <div className="name">{item.name}</div>
                <div className="description">{item.description}</div>
                <div className="limit">월 {item.monthlyLimit}회 한정</div>
            </Info>

            <Action>
                <div className="cost">
                    <span>💎</span>
                    <span className="cost-value">{item.gemCost.toLocaleString()}</span>
                </div>
                <ActionButton onClick={() => onAction(item.gemItemId)}>교환하기</ActionButton>
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
`;

const Info = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;

    .name {
        font-size: 14px;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.primary800};
    }

    .description {
        font-size: 12px;
        color: ${({ theme }) => theme.colors.black_op_70};
    }

    .limit {
        font-size: 11px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.primary700};
    }
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
`;

export default GemItemCard;
