import { FiBookOpen, FiCalendar, FiList, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SideActions = () => {
    const navigate = useNavigate();

    return (
        <StyledContainer>
            <button>
                <FiUser />
            </button>
            <button>
                <FiBookOpen />
            </button>
            <button onClick={() => navigate('/point-shop')}>
                <FiList />
            </button>
            <button>
                <FiCalendar />
            </button>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    button {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.85);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        color: ${({ theme }) => theme.colors.primary800};
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
        transition: background-color 0.15s ease;

        &:hover {
            background-color: rgba(255, 255, 255, 1);
        }
    }
`;

export default SideActions;
