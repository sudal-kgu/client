import styled from 'styled-components';

import type { TrashDetail } from '../../api/types';

interface Props {
    disposal: TrashDetail['disposal'];
}

const TrashDisposal = ({ disposal }: Props) => {
    return (
        <StyledContainer>
            <div className="disposal">
                <div className="title">공통 처리 방법</div>
                <div className="steps">
                    {disposal.category.map((step, index) => (
                        <StyledStep
                            $isOdd={index % 2 === 1}
                            $isLast={disposal.category.length === index + 1}
                        >
                            <div className="index">
                                <div className="number">
                                    {index < 9 ? `0${index + 1}` : index + 1}
                                </div>
                                <div className="line" />
                            </div>
                            <div className="content">{step}</div>
                        </StyledStep>
                    ))}
                </div>
            </div>
            {disposal.subcategory && (
                <div className="disposal">
                    <div className="title">상세 처리 방법</div>
                    <div className="steps">
                        {disposal.subcategory.map((step, index) => (
                            <StyledStep
                                $isOdd={index % 2 === 1}
                                $isLast={disposal.subcategory!.length === index + 1}
                            >
                                <div className="index">
                                    <div className="number">
                                        {index < 9 ? `0${index + 1}` : index + 1}
                                    </div>
                                    <div className="line" />
                                </div>
                                <div className="content">{step}</div>
                            </StyledStep>
                        ))}
                    </div>
                </div>
            )}
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    padding: 16px;
    display: flex;
    gap: 24px;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.primary400};

    .disposal {
        padding: 24px;
        display: flex;
        gap: 24px;
        flex-direction: column;
        background-color: ${({ theme }) => theme.colors.white};
        border-radius: 16px;

        .title {
            font-size: 20px;
            font-weight: 600;
            color: ${({ theme }) => theme.colors.primary800};
        }

        .steps {
            display: flex;
            flex-direction: column;
            gap: 40px;
        }
    }
`;

const StyledStep = styled.div<{ $isOdd: boolean; $isLast: boolean }>`
    display: flex;
    gap: 8px;

    .index {
        position: relative;
        display: flex;
        flex-direction: column;

        .number {
            padding: 8px;
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 500;
            border-radius: 50%;
            color: ${(props) =>
                props.$isOdd ? props.theme.colors.primary700 : props.theme.colors.white};
            background-color: ${(props) =>
                props.$isOdd ? props.theme.colors.primary400 : props.theme.colors.primary800};
            z-index: 1;
        }

        .line {
            position: absolute;
            display: ${(props) => (props.$isLast ? 'none' : null)};
            top: 0;
            left: 50%;
            width: 1px;
            height: calc(100% + 40px);
            border-left: 1px solid ${({ theme }) => theme.colors.primary600};
        }
    }

    .content {
        font-weight: 500;
        color: ${({ theme }) => theme.colors.primary800};
        overflow-wrap: break-word;
        word-break: break-all;
    }
`;

export default TrashDisposal;
