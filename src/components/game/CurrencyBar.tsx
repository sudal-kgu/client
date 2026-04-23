import styled from 'styled-components';

import type { Currency } from '../../api/types';

interface Props {
    currency: Currency;
}

const CURRENCY_ITEMS = [
    { key: 'shell', icon: '/game/shell.png', alt: '조개' },
    { key: 'gem', icon: '/game/gem.png', alt: '보석' },
    { key: 'fuel', icon: '/game/fuel.png', alt: '연료' },
] as const;

const CurrencyBar = ({ currency }: Props) => {
    return (
        <Container>
            {CURRENCY_ITEMS.map(({ key, icon, alt }) => (
                <CurrencyItem key={key}>
                    <Icon src={icon} alt={alt} />
                    <Amount>{currency[key].toLocaleString()}</Amount>
                </CurrencyItem>
            ))}
        </Container>
    );
};

const Container = styled.div`
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

const Amount = styled.span``;

export default CurrencyBar;
