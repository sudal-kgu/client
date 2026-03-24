import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
    onBack?: () => void;
}

const Header = ({ onBack }: Props) => {
    const navigate = useNavigate();
    const onClick = onBack ? onBack : () => navigate(-1);

    return (
        <StyledContainer>
            <button onClick={onClick}>
                <FiArrowLeft />
            </button>
            <div>로고</div>
            <div className="invisible"></div>
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

    button {
        width: 24px;
        height: 24px;
        font-size: 24px;
        font-weight: 400;
        color: ${({ theme }) => theme.colors.primary700};
    }

    .invisible {
        width: 40px;
        visibility: hidden;
    }
`;

export default Header;
