import styled from 'styled-components';

import useShop from '../../api/hooks/useShop';
import ShopItemCard from './ShopItemCard';

const ShopItemList = () => {
    const { items, isLoading, purchase, isPurchasing } = useShop();

    const handleAction = (itemId: number) => {
        if (isPurchasing) return;
        purchase(itemId);
    };

    if (isLoading) return <Empty>불러오는 중...</Empty>;
    if (items.length === 0) return <Empty>정화 아이템이 없습니다.</Empty>;

    return (
        <StyledContainer>
            {items.map((item) => (
                <ShopItemCard key={item.itemId} item={item} onAction={handleAction} />
            ))}
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const Empty = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.black_op_70};
`;

export default ShopItemList;
