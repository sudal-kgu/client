import styled, { css } from 'styled-components';

import type { QuizOption } from '../../hooks/useQuiz';

export type SelectionState = 'idle' | 'selected';

interface Props {
    option: QuizOption;
    index: number;
    selectionState: SelectionState;
    onClick: () => void;
}

const QuizOptionItem = ({ option, index, selectionState, onClick }: Props) => {
    const label = index < 9 ? `0${index + 1}` : `${index + 1}`;

    return (
        <StyledContainer $state={selectionState} onClick={onClick}>
            <span className="label">{label}</span>
            <span className="text">{option.text}</span>
        </StyledContainer>
    );
};

const StyledContainer = styled.button<{ $state: SelectionState }>`
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
        box-shadow 0.2s ease;

    ${({ $state, theme }) =>
        $state === 'idle' &&
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
