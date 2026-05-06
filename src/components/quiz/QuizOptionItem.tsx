import styled, { css } from 'styled-components';

export interface QuizOption {
    id: number;
    text: string;
}

export type SelectionState = 'idle' | 'selected';

interface Props {
    option: QuizOption;
    index: number;
    selectionState: SelectionState;
    onClick: () => void;
    disabled?: boolean;
}

const QuizOptionItem = ({ option, index, selectionState, onClick, disabled = false }: Props) => {
    const label = index < 9 ? `0${index + 1}` : `${index + 1}`;

    return (
        <StyledContainer
            $state={selectionState}
            $disabled={disabled}
            onClick={disabled ? undefined : onClick}
            aria-disabled={disabled}
        >
            <span className="label">{label}</span>
            <span className="text">{option.text}</span>
        </StyledContainer>
    );
};

const StyledContainer = styled.button<{ $state: SelectionState; $disabled: boolean }>`
    width: 100%;
    padding: 16px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    border-radius: 12px;
    text-align: left;
    background-color: ${({ theme }) => theme.colors.primary100};
    box-shadow: ${({ theme }) => theme.shadows.default};
    transition:
        background-color 0.2s ease,
        box-shadow 0.2s ease,
        opacity 0.2s ease;

    ${({ $disabled }) =>
        $disabled &&
        css`
            cursor: not-allowed;
            opacity: 0.6;
        `}

    ${({ $state, theme, $disabled }) =>
        $state === 'idle' &&
        !$disabled &&
        css`
            &:active {
                background-color: ${theme.colors.primary200};
            }
        `}

    ${({ $state, theme }) =>
        $state === 'selected' &&
        css`
            background-color: ${theme.colors.primary200};
            box-shadow: none;
        `}

    .label {
        min-width: 20px;
        font-size: 14px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.primary800};
        padding-top: 1px;
        flex-shrink: 0;
    }

    .text {
        font-size: 15px;
        font-weight: 500;
        line-height: 1.5;
        color: ${({ theme }) => theme.colors.black};
        word-break: keep-all;
    }
`;

export default QuizOptionItem;
