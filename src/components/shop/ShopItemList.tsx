import styled from 'styled-components';

import ShopItemCard from './ShopItemCard';
import { FACILITY_ITEMS, PURIFY_ITEMS, REWARD_ITEMS, type TabType } from './shopData';

interface Props {
    activeTab: TabType;
    currentLevel: number;
}

const TAB_CONFIG: Record<TabType, { costIcon: string; buttonLabel: string }> = {
    정화: { costIcon: '⚡', buttonLabel: '정화하기' },
    시설: { costIcon: '⚡', buttonLabel: '건설하기' },
    상품: { costIcon: '💎', buttonLabel: '교환하기' },
};

const ITEMS_BY_TAB = {
    정화: PURIFY_ITEMS,
    시설: FACILITY_ITEMS,
    상품: REWARD_ITEMS,
};

const ShopItemList = ({ activeTab, currentLevel }: Props) => {
    const items = ITEMS_BY_TAB[activeTab];
    const { costIcon, buttonLabel } = TAB_CONFIG[activeTab];

    const handleAction = (id: number) => {
        // 구매 API 연동
        console.log('구매:', id);
    };

    return (
        <StyledContainer>
            {items.map((item) => (
                <ShopItemCard
                    key={item.id}
                    item={{
                        ...item,
                        locked:
                            item.requiredLevel !== undefined && currentLevel < item.requiredLevel,
                    }}
                    costIcon={costIcon}
                    buttonLabel={buttonLabel}
                    onAction={handleAction}
                />
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

export default ShopItemList;
