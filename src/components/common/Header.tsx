import { FiArrowLeft } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
    onBack?: () => void;
}

const Header = ({ onBack }: Props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const onClick = onBack ? onBack : () => navigate(-1);

    return (
        <StyledContainer>
            {location.pathname === '/' ? (
                <div className="invisible" />
            ) : (
                <button onClick={onClick}>
                    <FiArrowLeft />
                </button>
            )}
            <img src="/images/text-logo.png" />
            <div className="invisible" />
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    padding: 0 16px;
    width: 100%;
    height: 72px;
    min-height: 72px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background};
    position: sticky;
    top: 0;
    z-index: 3;

    img {
        width: 180px;
    }

    button {
        width: 24px;
        height: 24px;
        font-size: 24px;
        font-weight: 400;
        color: ${({ theme }) => theme.colors.primary700};
    }

    .invisible {
        width: 24px;
        visibility: hidden;
    }
`;

export default Header;
