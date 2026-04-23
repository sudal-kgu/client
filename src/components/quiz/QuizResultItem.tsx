import { useState } from 'react';

import { FiCheck, FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi';
import styled from 'styled-components';

import type { QuizQuestion } from '../../hooks/useQuiz';

interface Props {
    question: QuizQuestion;
    index: number;
    selectedOptionId: number | null;
}

const QuizResultItem = ({ question, index, selectedOptionId }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const isCorrect = question.correctOptionId === selectedOptionId;

    const correctOption = question.options.find((o) => o.id === question.correctOptionId);
    const selectedOption = question.options.find((o) => o.id === selectedOptionId);

    return (
        <StyledContainer $isCorrect={isCorrect}>
            <button className="header" onClick={() => setIsOpen((prev) => !prev)}>
                <div className="left">
                    <span className={`icon ${isCorrect ? 'correct' : 'wrong'}`}>
                        {isCorrect ? <FiCheck strokeWidth={3} /> : <FiX strokeWidth={3} />}
                    </span>
                    <span className="label">문제 {index + 1}</span>
                </div>
                <span className="chevron">{isOpen ? <FiChevronUp /> : <FiChevronDown />}</span>
            </button>

            {isOpen && (
                <div className="body">
                    <p className="question-text">{question.question}</p>
                    <div className="options">
                        {correctOption && (
                            <div className="option-item correct">
                                <span className="option-icon">
                                    <FiCheck strokeWidth={3} />
                                </span>
                                <span className="option-text">{correctOption.text}</span>
                                <span className="option-tag">정답</span>
                            </div>
                        )}
                        {!isCorrect && selectedOption && (
                            <div className="option-item wrong">
                                <span className="option-icon">
                                    <FiX strokeWidth={3} />
                                </span>
                                <span className="option-text">{selectedOption.text}</span>
                                <span className="option-tag">내 선택</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </StyledContainer>
    );
};

const StyledContainer = styled.div<{ $isCorrect: boolean }>`
    border-radius: 12px;
    overflow: hidden;
    box-shadow: ${({ theme }) => theme.shadows.default};
    background-color: ${({ $isCorrect, theme }) =>
        $isCorrect ? theme.colors.primary200 : theme.colors.error_op_10};

    .header {
        width: 100%;
        padding: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-align: left;
        background-color: transparent;

        .left {
            display: flex;
            align-items: center;
            gap: 10px;

            .icon {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 13px;
                color: ${({ theme }) => theme.colors.white};
                flex-shrink: 0;

                &.correct {
                    background-color: ${({ theme }) => theme.colors.primary500};
                }

                &.wrong {
                    background-color: ${({ theme }) => theme.colors.badge};
                }
            }

            .label {
                font-size: 14px;
                font-weight: 500;
                color: ${({ theme }) => theme.colors.black};
            }
        }

        .chevron {
            font-size: 18px;
            color: ${({ theme }) => theme.colors.black_op_70};
            display: flex;
            align-items: center;
        }
    }

    .body {
        padding: 0 16px 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;

        .question-text {
            font-size: 14px;
            font-weight: 600;
            color: ${({ theme }) => theme.colors.black};
            line-height: 1.5;
            word-break: keep-all;
            padding-top: 4px;
        }

        .options {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .option-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 14px;
            border-radius: 12px;

            &.correct {
                background-color: ${({ theme }) => theme.colors.primary200};
                border: 1.5px solid ${({ theme }) => theme.colors.primary500};
            }

            &.wrong {
                background-color: ${({ theme }) => theme.colors.error_op_10};
                border: 1.5px solid ${({ theme }) => theme.colors.badge};
            }

            .option-icon {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                color: ${({ theme }) => theme.colors.white};
                flex-shrink: 0;
            }

            &.correct .option-icon {
                background-color: ${({ theme }) => theme.colors.primary500};
            }

            &.wrong .option-icon {
                background-color: ${({ theme }) => theme.colors.badge};
            }

            .option-text {
                flex: 1;
                font-size: 14px;
                font-weight: 500;
                color: ${({ theme }) => theme.colors.black};
                word-break: keep-all;
            }

            .option-tag {
                font-size: 10px;
                font-weight: 600;
                flex-shrink: 0;
            }

            &.correct .option-tag {
                color: ${({ theme }) => theme.colors.primary500};
            }

            &.wrong .option-tag {
                color: ${({ theme }) => theme.colors.badge};
            }
        }
    }
`;

export default QuizResultItem;
