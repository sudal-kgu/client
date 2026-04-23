import { useState } from 'react';

export interface QuizOption {
    id: number;
    text: string;
}

export interface QuizQuestion {
    id: number;
    question: string;
    options: QuizOption[];
    correctOptionId: number;
}

interface UseQuizProps {
    questions: QuizQuestion[];
    onFinish?: (selectedOptionIds: (number | null)[]) => void;
}

const useQuiz = ({ questions, onFinish }: UseQuizProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOptionIds, setSelectedOptionIds] = useState<(number | null)[]>(
        Array(questions.length).fill(null),
    );

    const currentQuestion = questions[currentIndex];
    const totalCount = questions.length;
    const selectedOptionId = selectedOptionIds[currentIndex];

    const selectOption = (optionId: number) => {
        setSelectedOptionIds((prev) => {
            const next = [...prev];
            next[currentIndex] = optionId;
            return next;
        });
    };

    const goNext = () => {
        if (currentIndex + 1 >= totalCount) {
            onFinish?.(selectedOptionIds);
            return;
        }
        setCurrentIndex((prev) => prev + 1);
    };

    return {
        currentQuestion,
        currentIndex,
        totalCount,
        selectedOptionId,
        selectOption,
        goNext,
    };
};

export default useQuiz;
