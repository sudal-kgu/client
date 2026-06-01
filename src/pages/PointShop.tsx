import { useState } from 'react';

import styled from 'styled-components';

import PageContainer from '../components/common/PageContainer';
import GemItemList from '../components/shop/GemItemList';
import LevelUpNoticeModal from '../components/shop/LevelUpNoticeModal';
import ShopItemList from '../components/shop/ShopItemList';

type Tab = 'shell' | 'gem';

const PointShop = () => {
    const [activeTab, setActiveTab] = useState<Tab>('shell');

    return (
        <PageContainer backTo="/">
            <TabBar>
                <TabButton active={activeTab === 'shell'} onClick={() => setActiveTab('shell')}>
                    🐚 조개 상점
                </TabButton>
                <TabButton active={activeTab === 'gem'} onClick={() => setActiveTab('gem')}>
                    💎 보석 상점
                </TabButton>
            </TabBar>

            {activeTab === 'shell' ? <ShopItemList /> : <GemItemList />}

            <LevelUpNoticeModal />
        </PageContainer>
    );
};

const TabBar = styled.div`
    display: flex;
    gap: 8px;
    padding: 12px 16px 0;
    flex-shrink: 0;
`;

const TabButton = styled.button<{ active: boolean }>`
    flex: 1;
    padding: 10px 0;
    border-radius: 12px;
    font-size: 13px;
    font-weight: 700;
    transition:
        background-color 0.15s ease,
        color 0.15s ease;

    background-color: ${({ theme, active }) =>
        active ? theme.colors.primary400 : theme.colors.primary200};
    color: ${({ theme, active }) => (active ? theme.colors.primary800 : theme.colors.black_op_70)};
`;

export default PointShop;
