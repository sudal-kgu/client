import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import useQuizSession from '../../api/hooks/useQuizSession';

const ChecklistPointBanner = () => {
    const { trashId } = useParams();
    const { createSession, isCreating } = useQuizSession({ enabled: false });

    return (
        <StyledButton onClick={() => createSession(trashId!)} disabled={isCreating}>
            퀴즈 풀고 포인트 받기
        </StyledButton>
    );
};

const StyledButton = styled.button`
    width: 100%;
    height: 48px;
    border-radius: 64px;
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary700};
    opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
    transition: opacity 0.15s;
`;

export default ChecklistPointBanner;
