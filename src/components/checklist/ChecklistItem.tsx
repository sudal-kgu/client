import styled from 'styled-components';

interface Props {
    step: string;
    index: number;
    isChecked: boolean;
    onToggle: () => void;
}

const ChecklistItem = ({ step, index, isChecked, onToggle }: Props) => {
    return (
        <StyledContainer $isChecked={isChecked} onClick={onToggle}>
            <div className="checkbox">{isChecked && <div className="check-mark" />}</div>
            <div className="content">
                <div className="title">{`Step ${index + 1}`}</div>
                <div className="step">{step}</div>
            </div>
        </StyledContainer>
    );
};

const StyledContainer = styled.div<{ $isChecked: boolean }>`
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    border-radius: 16px;
    background-color: ${(props) =>
        props.$isChecked ? props.theme.colors.primary300 : props.theme.colors.white};
    box-shadow: ${({ theme }) => theme.shadows.default};
    cursor: pointer;
    transition: background-color 0.15s ease;

    .checkbox {
        min-width: 28px;
        height: 28px;
        border-radius: 50%;
        border: 2px solid
            ${(props) =>
                props.$isChecked ? props.theme.colors.primary700 : props.theme.colors.primary300};
        background-color: ${(props) =>
            props.$isChecked ? props.theme.colors.primary700 : props.theme.colors.white};
        display: flex;
        justify-content: center;
        align-items: center;
        transition: background-color 0.15s ease;

        .check-mark {
            width: 8px;
            height: 13px;
            border-right: 2.5px solid ${({ theme }) => theme.colors.white};
            border-bottom: 2.5px solid ${({ theme }) => theme.colors.white};
            transform: rotate(45deg) translate(-1px, -1px);
        }
    }

    .content {
        display: flex;
        flex-direction: column;
        gap: 6px;

        .title {
            font-size: 16px;
            font-weight: 700;
            color: ${({ theme }) => theme.colors.primary800};
        }

        .step {
            font-size: 16px;
            font-weight: 500;
            color: ${({ theme }) => theme.colors.primary800};
            line-height: 1.5;
        }
    }
`;

export default ChecklistItem;
