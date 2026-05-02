import { useEffect, useRef, useState } from 'react';

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
    onFinish?: (
        selectedOptionIds: (number | null)[],
        expiredIndices: boolean[],
    ) => void | Promise<void>;
}

const useQuiz = ({ questions, initialChoices, initialIndex = 0, onFinish }: UseQuizProps) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [selectedOptionIds, setSelectedOptionIds] = useState<(number | null)[]>(
        Array(questions.length).fill(null),
    );
    const [expiredIndices, setExpiredIndices] = useState<boolean[]>([]);

    const initialChoicesRef = useRef(initialChoices);
    const initialIndexRef = useRef(initialIndex);
    const initializedRef = useRef(false);

    useEffect(() => {
        initialChoicesRef.current = initialChoices;
        initialIndexRef.current = initialIndex;
    });

    useEffect(() => {
        if (questions.length === 0) return;
        if (initializedRef.current) return;

        initializedRef.current = true;

        const choices = initialChoicesRef.current;
        const index = initialIndexRef.current;

        setCurrentIndex(index);
        setSelectedOptionIds(
            choices && choices.length === questions.length
                ? [...choices]
                : Array(questions.length).fill(null),
        );
        setExpiredIndices(Array(questions.length).fill(false));
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

    const goNext = async (
        isExpired: boolean,
        onBeforeAdvance?: (
            problemId: number,
            choiceId: number | null,
            nextIndex: number,
            expired: boolean,
        ) => void | Promise<void>,
    ) => {
        if (!currentQuestion) return;

        const choiceId = selectedOptionIds[currentIndex];

        if (!isExpired && choiceId === null) return;

        const nextIndex = currentIndex + 1;
        const isLast = nextIndex >= totalCount;

        const newExpiredIndices = [...expiredIndices];
        const newSelectedOptionIds = [...selectedOptionIds];

        if (isExpired) {
            newExpiredIndices[currentIndex] = true;
            newSelectedOptionIds[currentIndex] = null;
            setExpiredIndices(newExpiredIndices);
            setSelectedOptionIds(newSelectedOptionIds);
        }

        const effectiveChoiceId = isExpired ? null : choiceId;

        await onBeforeAdvance?.(currentQuestion.id, effectiveChoiceId, nextIndex, isExpired);

        if (isLast) {
            const safeExpiredIndices = Array.from(
                { length: totalCount },
                (_, i) => newExpiredIndices[i] ?? false,
            );
            const safeSelectedOptionIds = Array.from(
                { length: totalCount },
                (_, i) => newSelectedOptionIds[i] ?? null,
            );
            onFinish?.(safeSelectedOptionIds, safeExpiredIndices);
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
