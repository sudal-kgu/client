import { useEffect, useRef } from 'react';

import { ImSpinner2 } from 'react-icons/im';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import useAnalysisResult from '../api/hooks/useAnalysisResult';
import AnalysisResultItem from '../components/analysis/AnalysisResultItem';
import PageContainer from '../components/common/PageContainer';

const TrashAnalysisResult = () => {
    const { id } = useParams();
    const targetRef = useRef<HTMLDivElement>(null);

    if (!id) throw new Error();

    const { results, totalItems, fetchNextPage, isFetching, hasNextPage } = useAnalysisResult({
        id,
        size: 8,
    });

    useEffect(() => {
        if (!targetRef.current || isFetching || !hasNextPage) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        });

        observer.observe(targetRef.current);

        return () => observer.disconnect();
    }, [hasNextPage, isFetching, fetchNextPage]);

    return (
        <PageContainer backTo="/camera">
            <StyledContainer>
                <div className="total">{`총 ${totalItems}개`}</div>
                <div className="grid">
                    {results.map((result) => (
                        <AnalysisResultItem key={result.uuid} result={result} analysisId={id} />
                    ))}
                </div>
                <div></div>
                {isFetching && (
                    <div className="spinner-conatiner">
                        <ImSpinner2 className="spinner" />
                    </div>
                )}
                {hasNextPage && <div ref={targetRef} />}
                {!hasNextPage && <div className="eoc">항목을 눌러 처리 방법을 확인하세요!</div>}
            </StyledContainer>
        </PageContainer>
    );
};

const StyledContainer = styled.div`
    padding: 0 16px;
    height: 100%;
    padding-bottom: 32px;

    .total {
        margin-top: 24px;
        font-size: 16px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.primary800};
    }

    .grid {
        margin-top: 32px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 12px;
        justify-content: center;
    }

    .spinner-conatiner {
        padding: 32px;
        display: flex;
        justify-content: center;
    }

    .spinner {
        @keyframes loop {
            0% {
                transform: rotateZ(0deg);
            }

            100% {
                transform: rotateZ(360deg);
            }
        }
        font-size: 32px;
        color: ${({ theme }) => theme.colors.primary700};
        animation: loop ease-in-out 1s infinite;
    }

    .eoc {
        padding: 24px;
        text-align: center;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.black};
    }
`;

export default TrashAnalysisResult;
