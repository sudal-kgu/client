import { useState } from 'react';

import { FiCheck, FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi';
import styled from 'styled-components';

import type { QuizProblem } from '../../api/types';

interface Props {
    problem: QuizProblem;
    index: number;
}

type ChoiceState = 'correct' | 'wrong' | 'default';

const ProblemAccordion = ({ problem, index }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const isCorrect = problem.choice !== null && problem.choice === problem.answer;

    const sortedChoices = [...problem.choices].sort((a, b) => a.order - b.order);

    const getChoiceState = (choiceId: number): ChoiceState => {
        if (choiceId === problem.answer) return 'correct';
        if (choiceId === problem.choice) return 'wrong';
        return 'default';
    };

    return (
        <StyledContainer $correct={isCorrect}>
            <button className="header" onClick={() => setIsOpen((v) => !v)}>
                <StatusIcon $correct={isCorrect}>
                    {isCorrect ? <FiCheck strokeWidth={3} /> : <FiX strokeWidth={3} />}
                </StatusIcon>
                <span className="label">문제 {index + 1}</span>
                {isOpen ? (
                    <FiChevronUp className="chevron" />
                ) : (
                    <FiChevronDown className="chevron" />
                )}
            </button>

            {isOpen && (
                <div className="body">
                    <p className="description">{problem.description}</p>
                    <div className="choices">
                        {sortedChoices.map((choice, idx) => {
                            const state = getChoiceState(choice.id);
                            return (
                                <ChoiceRow key={choice.id} $state={state}>
                                    <span className="number">
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <span className="text">{choice.description}</span>
                                    {state === 'correct' && (
                                        <FiCheck className="mark" strokeWidth={3} />
                                    )}
                                    {state === 'wrong' && <FiX className="mark" strokeWidth={3} />}
                                </ChoiceRow>
                            );
                        })}
                    </div>
                </div>
            )}
        </StyledContainer>
    );
};

const StyledContainer = styled.div<{ $correct: boolean }>`
    border-radius: 12px;
    background-color: ${({ theme, $correct }) =>
        $correct ? theme.colors.primary200 : theme.colors.error_op_10};
    overflow: hidden;

    .header {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 14px 16px;
        cursor: pointer;

        .label {
            flex: 1;
            font-size: 14px;
            font-weight: 600;
            color: ${({ theme }) => theme.colors.black};
            text-align: left;
        }

        .chevron {
            font-size: 16px;
            color: ${({ theme }) => theme.colors.black_op_70};
            flex-shrink: 0;
        }
    }

    .body {
        padding: 0 16px 14px 16px;
        display: flex;
        flex-direction: column;
        gap: 10px;

        .description {
            font-size: 13px;
            font-weight: 500;
            color: ${({ theme }) => theme.colors.black};
            line-height: 1.6;
            padding: 0 2px;
        }

        .choices {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
    }
`;

const StatusIcon = styled.div<{ $correct: boolean }>`
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: ${({ theme, $correct }) =>
        $correct ? theme.colors.primary700 : theme.colors.badge};
    color: ${({ theme }) => theme.colors.white};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    flex-shrink: 0;
`;

const ChoiceRow = styled.div<{ $state: ChoiceState }>`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    border-radius: 8px;
    background-color: ${({ theme, $state }) => {
        if ($state === 'correct') return theme.colors.primary300;
        if ($state === 'wrong') return theme.colors.error_op_10;
        return theme.colors.background;
    }};
    opacity: ${({ $state }) => ($state === 'default' ? 0.5 : 1)};

    .number {
        font-size: 12px;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.primary800};
        min-width: 20px;
        flex-shrink: 0;
    }

    .text {
        flex: 1;
        font-size: 13px;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.black};
        line-height: 1.5;
    }

    .mark {
        font-size: 14px;
        flex-shrink: 0;
        color: ${({ theme, $state }) =>
            $state === 'correct' ? theme.colors.primary700 : theme.colors.badge};
    }
`;

export default ProblemAccordion;
