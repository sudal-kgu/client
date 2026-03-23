import { Link } from 'react-router-dom';
import styled from 'styled-components';

import type { AnalaysisResultItem } from '../../api/types';

interface Props {
    analysisId: string;
    result: AnalaysisResultItem;
}

const AnalysisResultItem = ({ analysisId, result }: Props) => {
    return (
        <StyledContainer to={`/analysis/${analysisId}/trashes/${result.uuid}`}>
            <img src={result.image} />
            <div className="label">
                <div className="category">{result.category}</div>
                <div className="subcategory">{result.subcategory}</div>
            </div>
        </StyledContainer>
    );
};

const StyledContainer = styled(Link)`
    padding: 12px;
    aspect-ratio: 4 / 5;
    display: flex;
    gap: 12px;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.primary400};
    border-radius: 12px;

    img {
        aspect-ratio: 1;
        object-fit: cover;
        border-radius: 12px;
    }

    .label {
        display: flex;
        gap: 4px;
        flex-direction: column;

        .category {
            font-size: 12px;
        }

        .subcategory {
            font-weight: 700;
            font-size: 14px;
        }
    }
`;

export default AnalysisResultItem;
