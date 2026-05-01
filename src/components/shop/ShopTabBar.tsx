import styled from 'styled-components';

import type { TabType } from './shopData';

interface Props {
    activeTab: TabType;
    onChange: (tab: TabType) => void;
}

const TABS: TabType[] = ['정화', '시설', '상품'];

const ShopTabBar = ({ activeTab, onChange }: Props) => {
    return (
        <StyledContainer>
            {TABS.map((tab) => (
                <button
                    key={tab}
                    className={activeTab === tab ? 'active' : ''}
                    onClick={() => onChange(tab)}
                >
                    {tab}
                </button>
            ))}
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    border-bottom: 1.5px solid ${({ theme }) => theme.colors.primary300};
    flex-shrink: 0;

    button {
        flex: 1;
        height: 48px;
        font-size: 15px;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.primary800};
        opacity: 0.5;
        border-bottom: 2.5px solid transparent;
        transition:
            opacity 0.15s ease,
            border-color 0.15s ease;

        &.active {
            opacity: 1;
            border-bottom-color: ${({ theme }) => theme.colors.primary700};
            color: ${({ theme }) => theme.colors.primary700};
            font-weight: 700;
        }
    }
`;

export default ShopTabBar;
