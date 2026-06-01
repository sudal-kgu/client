import styled from 'styled-components';

import useGemShop from '../../api/hooks/useGemShop';
import GemItemCard from './GemItemCard';

const GemItemList = () => {
    const { gemItems, isLoading, exchange, isExchanging } = useGemShop();

    const handleAction = (gemItemId: number) => {
        if (isExchanging) return;
        exchange(gemItemId);
    };

    if (isLoading) return <Empty>불러오는 중...</Empty>;
    if (gemItems.length === 0) return <Empty>교환 가능한 보석 아이템이 없습니다.</Empty>;

    return (
        <StyledContainer>
            {gemItems.map((item) => (
                <GemItemCard key={item.gemItemId} item={item} onAction={handleAction} />
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
    margin-top: 16px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.black_op_70};
`;

export default GemItemList;
