import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import useTrashDetail from '../api/hooks/useTrashDetail';
import ChecklistItem from '../components/checklist/ChecklistItem';
import ChecklistPointBanner from '../components/checklist/ChecklistPointBanner';
import PageContainer from '../components/common/PageContainer';

const Checklist = () => {
    const { trashId } = useParams();
    const navigate = useNavigate();

    if (!trashId) {
        navigate('/camera', { replace: true });
        throw new Error();
    }

    const { detail } = useTrashDetail(trashId);
    const allSteps = detail?.disposal.category ?? [];
    const [checked, setChecked] = useState<number[]>([]);
    const onToggle = (index: number) => {
        setChecked((prev) =>
            prev.includes(index) ? prev.filter((v) => v !== index) : [...prev, index],
        );
    };

    return (
        <PageContainer>
            <StyledContainer>
                <div className="header">
                    <h1 className="title">체크 리스트</h1>
                    <p className="subtitle">당신의 작은 체크가 깨끗한 자원이 됩니다.</p>
                </div>

                {detail && (
                    <div className="items">
                        {allSteps.map((step, index) => (
                            <ChecklistItem
                                key={index}
                                step={step}
                                index={index}
                                isChecked={checked.includes(index)}
                                onToggle={() => onToggle(index)}
                            />
                        ))}
                    </div>
                )}
            </StyledContainer>

            <StyledFooter>
                <ChecklistPointBanner />
            </StyledFooter>
        </PageContainer>
    );
};

const StyledContainer = styled.div`
    padding: 0 16px 120px 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .header {
        margin-top: 24px;
        display: flex;
        flex-direction: column;
        gap: 8px;

        .title {
            font-size: 24px;
            font-weight: 700;
            color: ${({ theme }) => theme.colors.primary800};
        }

        .subtitle {
            font-size: 14px;
            font-weight: 400;
            color: ${({ theme }) => theme.colors.black_op_70};
        }
    }

    .items {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
`;

const StyledFooter = styled.div`
    padding: 16px;
    width: 100%;
    max-width: 530px;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${({ theme }) => theme.colors.background};
`;

export default Checklist;
