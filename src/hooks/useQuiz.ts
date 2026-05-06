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

export interface BeforeAdvanceArgs {
    problemId: number;
    choiceId: number | null;
    nextIndex: number;
    isExpired: boolean;
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
    const [isAdvancing, setIsAdvancing] = useState(false);

    const advancingRef = useRef(false);

    const initializedRef = useRef(false);

    useEffect(() => {
        if (questions.length === 0) return;

        if (initializedRef.current) return;
        initializedRef.current = true;

        setCurrentIndex(initialIndex);
        setSelectedOptionIds(
            initialChoices && initialChoices.length === questions.length
                ? [...initialChoices]
                : Array(questions.length).fill(null),
        );
        setExpiredIndices(Array(questions.length).fill(false));
    }, [questions.length, initialIndex, initialChoices]);

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
        onBeforeAdvance?: (args: BeforeAdvanceArgs) => void | Promise<void>,
    ) => {
        if (!currentQuestion) return;
        if (advancingRef.current) return;

        const choiceId = selectedOptionIds[currentIndex];
        if (!isExpired && choiceId === null) return;

        advancingRef.current = true;
        setIsAdvancing(true);

        try {
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
            await onBeforeAdvance?.({
                problemId: currentQuestion.id,
                choiceId: effectiveChoiceId,
                nextIndex,
                isExpired,
            });

            if (isLast) {
                const safeExpiredIndices = Array.from(
                    { length: totalCount },
                    (_, i) => newExpiredIndices[i] ?? false,
                );
                const safeSelectedOptionIds = Array.from(
                    { length: totalCount },
                    (_, i) => newSelectedOptionIds[i] ?? null,
                );
                await onFinish?.(safeSelectedOptionIds, safeExpiredIndices);
                return;
            }

            setCurrentIndex(nextIndex);
        } finally {
            advancingRef.current = false;
            setIsAdvancing(false);
        }
    };

    return {
        currentQuestion,
        currentIndex,
        totalCount,
        selectedOptionId,
        selectedOptionIds,
        expiredIndices,
        isAdvancing,
        selectOption,
        goNext,
    };
};

export default useQuiz;
