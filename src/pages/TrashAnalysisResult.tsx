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

    const { results, fetchNextPage, isFetching, hasNextPage } = useAnalysisResult({ id, size: 8 });

    useEffect(() => {
        if (!targetRef.current || isFetching || !hasNextPage) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        });

        observer.observe(targetRef.current);

        return () => observer.disconnect();
    }, [hasNextPage, isFetching]);

    return (
        <PageContainer>
            <StyledContainer>
                <div className="total">{`총 N개`}</div>
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
            </StyledContainer>
        </PageContainer>
    );
};

const StyledContainer = styled.div`
    padding: 0 16px;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.primary500};
    padding-bottom: 32px;

    .total {
        padding: 8px 12px;
        width: 128px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.primary800};
        border-radius: 24px;
        background-color: ${({ theme }) => theme.colors.primary400};
    }

    .grid {
        margin-top: 16px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
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
`;

export default TrashAnalysisResult;
