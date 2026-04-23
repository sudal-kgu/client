import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import useTrashDetail from '../api/hooks/useTrashDetail';
import PageContainer from '../components/common/PageContainer';
import TrashDetailHero from '../components/detail/TrashDetailHero';
import TrashDisposal from '../components/detail/TrashDisposal';

const TrashDetail = () => {
    const { trashId, analysisId } = useParams();
    const navigate = useNavigate();

    if (!analysisId) {
        navigate('/camera', { replace: true });
        throw new Error();
    }
    if (!trashId) {
        navigate(`/analysis/${analysisId}`, { replace: true });
        throw new Error();
    }

    const { detail } = useTrashDetail(trashId);

    return (
        <PageContainer>
            <StyledContainer>
                {detail && (
                    <>
                        <TrashDetailHero
                            image={detail.image}
                            category={detail.category}
                            subcategory={detail.subcategory}
                        />
                        <TrashDisposal disposal={detail.disposal} />
                        <StyledButton
                            onClick={() =>
                                navigate(`/analysis/${analysisId}/trashes/${trashId}/checklist`)
                            }
                        >
                            체크리스트
                        </StyledButton>
                    </>
                )}
            </StyledContainer>
        </PageContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledButton = styled.button`
    margin: 16px 16px 32px 16px;
    height: 56px;
    border-radius: 64px;
    font-size: 18px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary700};
`;

export default TrashDetail;
