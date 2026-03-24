import { FaRegTrashAlt } from 'react-icons/fa';
import styled from 'styled-components';

interface Props {
    image: string;
    category: string;
    subcategory: string;
}

const TrashDetailHero = ({ image, category, subcategory }: Props) => {
    return (
        <StyledContainer $image={image}>
            <div className="cards">
                <div className="card category">
                    <div className="icon">
                        <FaRegTrashAlt />
                    </div>
                    <div className="label">
                        <div className="title">분류</div>
                        <div className="name">{category}</div>
                    </div>
                </div>
                <div className="card subcategory">
                    <div className="icon">
                        <FaRegTrashAlt />
                    </div>
                    <div className="label">
                        <div className="title">품목명</div>
                        <div className="name">{subcategory}</div>
                    </div>
                </div>
            </div>
        </StyledContainer>
    );
};

const StyledContainer = styled.div<{ $image: string }>`
    display: flex;
    align-items: flex-end;
    aspect-ratio: 12 / 9;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url(${(props) => props.$image});

    .cards {
        width: 100%;
        padding: 16px;
        display: flex;
        gap: 18px;
    }

    .card {
        padding: 16px;
        width: 100%;
        aspect-ratio: 12 / 9;
        border-radius: 24px;
        display: flex;
        gap: 12px;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .icon {
            font-size: 24px;
        }

        .label {
            display: flex;
            gap: 4px;
            flex-direction: column;
            justify-content: center;
            text-align: center;

            .title {
                font-size: 14px;
                font-weight: 700;
                color: ${({ theme }) => theme.colors.primary700};
                opacity: 0.7;
            }

            .name {
                font-size: 20px;
                font-weight: 700;
                color: ${({ theme }) => theme.colors.primary800};
            }
        }
    }

    .category {
        background-color: ${({ theme }) => theme.colors.primary400_op_70};
    }

    .subcategory {
        background-color: ${({ theme }) => theme.colors.primary200_op_70};
    }
`;

export default TrashDetailHero;
