import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const ChecklistPointBanner = () => {
    const navigate = useNavigate();
    const { trashId, analysisId } = useParams();

    return (
        <StyledContainer>
            <button
                className="point-button"
                onClick={() => navigate(`/analysis/${analysisId}/trashes/${trashId}/quiz`)}
            >
                퀴즈 풀고 포인트 받기
            </button>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    .point-button {
        width: 100%;
        height: 48px;
        border-radius: 64px;
        font-size: 16px;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.white};
        background-color: ${({ theme }) => theme.colors.primary700};
    }
`;

export default ChecklistPointBanner;
