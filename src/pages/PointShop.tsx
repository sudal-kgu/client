import { useState } from 'react';

import styled from 'styled-components';

import Header from '../components/common/Header';
import ShopItemList from '../components/shop/ShopItemList';
import ShopTabBar from '../components/shop/ShopTabBar';
import type { TabType } from '../components/shop/shopData';

const PointShop = () => {
    const [activeTab, setActiveTab] = useState<TabType>('정화');

    return (
        <StyledContainer>
            <div id="page">
                <Header />
                <ShopTabBar activeTab={activeTab} onChange={setActiveTab} />
                <ShopItemList activeTab={activeTab} currentLevel={1} />
            </div>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    height: 100dvh;
    background-color: ${({ theme }) => theme.colors.background};

    #page {
        margin: 0 auto;
        max-width: 530px;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    #header {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
        flex-shrink: 0;

        .back-button {
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            font-size: 20px;
            color: ${({ theme }) => theme.colors.primary800};

            &:hover {
                background-color: ${({ theme }) => theme.colors.primary200};
            }
        }

        .title {
            font-size: 16px;
            font-weight: 700;
            color: ${({ theme }) => theme.colors.primary800};
        }
    }
`;

export default PointShop;
