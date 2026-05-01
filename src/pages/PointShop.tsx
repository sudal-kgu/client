import { useState } from 'react';

import PageContainer from '../components/common/PageContainer';
import ShopItemList from '../components/shop/ShopItemList';
import ShopTabBar from '../components/shop/ShopTabBar';
import type { TabType } from '../components/shop/shopData';

const PointShop = () => {
    const [activeTab, setActiveTab] = useState<TabType>('정화');

    return (
        <PageContainer>
            <ShopTabBar activeTab={activeTab} onChange={setActiveTab} />
            <ShopItemList activeTab={activeTab} currentLevel={1} shell={0} gem={200000} />
        </PageContainer>
    );
};

export default PointShop;
