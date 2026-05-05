import styled from 'styled-components';

import useCurrency from '../../api/hooks/useCurrency';
import { CurrencyType } from '../../api/types';
import Spinner from '../common/Spinner';

const CURRENCY_ITEMS = [
    { key: CurrencyType.SHELL, icon: '/game/shell.png', alt: '조개' },
    { key: CurrencyType.GEM, icon: '/game/gem.png', alt: '보석' },
    { key: CurrencyType.FUEL, icon: '/game/fuel.png', alt: '연료' },
] as const;

const CurrencyBar = () => {
    const { currency, isLoading } = useCurrency();
    return (
        <StyledContainer>
            {CURRENCY_ITEMS.map(({ key, icon, alt }) => (
                <CurrencyItem key={key}>
                    <Icon src={icon} alt={alt} />
                    <Amount>
                        {isLoading ? <Spinner size={16} /> : currency[key].toLocaleString()}
                    </Amount>
                </CurrencyItem>
            ))}
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    position: fixed;
    top: 90px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    display: flex;
    gap: 6px;
    white-space: nowrap;
`;

const CurrencyItem = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px 10px;
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary800};
    box-shadow: ${({ theme }) => theme.shadows.default};
`;

const Icon = styled.img`
    width: 16px;
    height: 16px;
    object-fit: contain;
`;

const Amount = styled.span`
    min-width: 32px;
    text-align: center;
`;

export default CurrencyBar;
