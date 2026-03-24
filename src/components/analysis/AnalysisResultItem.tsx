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
    background-color: ${({ theme }) => theme.colors.primary200};
    border-radius: 12px;
    box-shadow: ${({ theme }) => theme.shadows.default};

    &:hover {
        @keyframes bounce {
            0% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-3px);
            }
            0% {
                transform: translateY(0);
            }
        }

        animation: bounce 0.5s ease-in-out infinite;
    }

    img {
        aspect-ratio: 1;
        object-fit: cover;
        border-radius: 12px;
    }

    .label {
        display: flex;
        gap: 8px;
        flex-direction: column;

        .category {
            padding: 2px 8px;
            width: fit-content;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 12px;
            color: ${({ theme }) => theme.colors.primary800};
            background-color: ${({ theme }) => theme.colors.white};
            border-radius: 48px;
            box-shadow: ${({ theme }) => theme.shadows.default};
        }

        .subcategory {
            font-weight: 700;
            font-size: 14px;
            color: ${({ theme }) => theme.colors.black};
        }
    }
`;

export default AnalysisResultItem;
