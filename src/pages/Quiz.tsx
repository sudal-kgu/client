import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import PageContainer from '../components/common/PageContainer';
import QuizOptionItem from '../components/quiz/QuizOptionItem';
import QuizProgress from '../components/quiz/QuizProgress';
import useQuiz, { type QuizQuestion } from '../hooks/useQuiz';

const QUIZ_QUESTIONS: QuizQuestion[] = [
    {
        id: 1,
        question: '영수증 종이는 어떻게 분리배출 해야 할까요?',
        options: [
            { id: 1, text: '일반 종이류로 재활용 배출' },
            { id: 2, text: '일반 쓰레기로 배출' },
            { id: 3, text: '종이팩으로 배출' },
            { id: 4, text: '비닐류로 배출' },
        ],
        correctOptionId: 2,
    },
    {
        id: 2,
        question: '피자 상자처럼 기름이 묻은 종이류는 어떻게 버려야 할까요?',
        options: [
            { id: 1, text: '종이류로 재활용 배출' },
            { id: 2, text: '물로 씻어서 종이류 배출' },
            { id: 3, text: '일반 쓰레기로 배출' },
        ],
        correctOptionId: 3,
    },
    {
        id: 3,
        question: '유리병 뚜껑은 유리병과 함께 버려야 할까요?',
        options: [
            { id: 1, text: '뚜껑도 유리병과 함께 유리류 배출' },
            { id: 2, text: '뚜껑 소재에 따라 분리하여 배출' },
            { id: 3, text: '모두 일반 쓰레기로 배출' },
        ],
        correctOptionId: 2,
    },
];

const Quiz = () => {
    const navigate = useNavigate();

    const { currentQuestion, currentIndex, totalCount, selectedOptionId, selectOption, goNext } =
        useQuiz({
            questions: QUIZ_QUESTIONS,
            onFinish: () => navigate('/quiz/result'),
        });

    const isLastQuestion = currentIndex + 1 === totalCount;

    return (
        <PageContainer>
            <StyledContainer>
                <div className="content">
                    <QuizProgress current={currentIndex + 1} total={totalCount} />
                    <div className="question">{currentQuestion.question}</div>
                    <div className="options">
                        {currentQuestion.options.map((option, index) => (
                            <QuizOptionItem
                                key={option.id}
                                option={option}
                                index={index}
                                selectionState={
                                    selectedOptionId === option.id ? 'selected' : 'idle'
                                }
                                onClick={() => selectOption(option.id)}
                            />
                        ))}
                    </div>
                </div>
                <div className="footer">
                    <button
                        className="next-btn"
                        disabled={selectedOptionId === null}
                        onClick={goNext}
                    >
                        {isLastQuestion ? '결과 보기' : '다음'}
                    </button>
                </div>
            </StyledContainer>
        </PageContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;

    .content {
        flex: 1;
        padding: 24px 24px 16px;
        display: flex;
        flex-direction: column;
        gap: 24px;
        overflow-y: auto;

        .question {
            font-size: 17px;
            font-weight: 600;
            color: ${({ theme }) => theme.colors.black};
            line-height: 1.5;
            word-break: keep-all;
        }

        .options {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
    }

    .footer {
        padding: 12px 24px 24px;
        background-color: ${({ theme }) => theme.colors.background};

        .next-btn {
            width: 100%;
            padding: 16px;
            border-radius: 64px;
            font-size: 16px;
            font-weight: 600;
            color: ${({ theme }) => theme.colors.white};
            background-color: ${({ theme }) => theme.colors.primary700};
            transition: opacity 0.2s ease;

            &:disabled {
                opacity: 0.35;
            }
        }
    }
`;

export default Quiz;
