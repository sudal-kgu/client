import styled from 'styled-components';

interface Currency {
    shell: number;
    gem: number;
    fuel: number;
}

interface Props {
    currency: Currency;
}

const CurrencyBar = ({ currency }: Props) => {
    return (
        <StyledContainer>
            <div className="currency-item">
                <span className="icon shell" />
                <span>{currency.shell.toLocaleString()}</span>
            </div>
            <div className="currency-item">
                <span className="icon gem" />
                <span>{currency.gem.toLocaleString()}</span>
            </div>
            <div className="currency-item">
                <span className="icon fuel" />
                <span>{currency.fuel.toLocaleString()}</span>
            </div>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    position: absolute;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;
    display: flex;
    gap: 8px;

    .currency-item {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 5px 10px;
        background-color: rgba(255, 255, 255, 0.9);
        border-radius: 20px;
        font-size: 13px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.primary800};
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
    }

    .icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 50%;

        &.shell {
            background: radial-gradient(circle at 35% 35%, #f4c97a, #d4893a);
        }
        &.gem {
            background: radial-gradient(circle at 35% 35%, #93c5fd, #3b82f6);
        }
        &.fuel {
            background: radial-gradient(circle at 35% 35%, #fca5a5, #ef4444);
        }
    }
`;

export default CurrencyBar;
