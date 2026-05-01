import { useEffect, useState } from 'react';

export interface QuizOption {
    id: number;
    text: string;
}

export interface QuizQuestion {
    id: number;
    question: string;
    options: QuizOption[];
    correctOptionId: number;
    expiredAt: string | null;
}

interface UseQuizProps {
    questions: QuizQuestion[];
    initialChoices?: (number | null)[];
    initialIndex?: number;
    onBeforeNext?: (problemId: number, choiceId: number, nextIndex: number) => void | Promise<void>;
    onFinish?: (selectedOptionIds: (number | null)[]) => void | Promise<void>;
}

const useQuiz = ({
    questions,
    initialChoices,
    initialIndex = 0,
    onBeforeNext,
    onFinish,
}: UseQuizProps) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [selectedOptionIds, setSelectedOptionIds] = useState<(number | null)[]>(
        Array(questions.length).fill(null),
    );

    useEffect(() => {
        setCurrentIndex(initialIndex);
        setSelectedOptionIds(
            initialChoices && initialChoices.length === questions.length
                ? [...initialChoices]
                : Array(questions.length).fill(null),
        );
    }, [questions]);

    const currentQuestion = questions[currentIndex] ?? null;
    const totalCount = questions.length;
    const selectedOptionId = selectedOptionIds[currentIndex] ?? null;

    const selectOption = (optionId: number) => {
        setSelectedOptionIds((prev) => {
            const next = [...prev];
            next[currentIndex] = optionId;
            return next;
        });
    };

    const goNext = async () => {
        const choiceId = selectedOptionIds[currentIndex];
        if (choiceId === null || !currentQuestion) return;

        const nextIndex = currentIndex + 1;
        const isLast = nextIndex >= totalCount;

        // submitAnswer + fetchNextProblem(다음 문제 getProblem → 20초 시작)을 onBeforeNext에서 처리
        await onBeforeNext?.(currentQuestion.id, choiceId, nextIndex);

        if (isLast) {
            onFinish?.(selectedOptionIds);
            return;
        }
        setCurrentIndex(nextIndex);
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
