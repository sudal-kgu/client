import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import QuizAPI from '../api/quiz';

const useQuizProblem = () => {
    const { sessionId, problemId } = useParams();

    const { data: problem, isLoading } = useQuery({
        queryFn: () => QuizAPI.getProblem(Number(sessionId), Number(problemId)),
        queryKey: ['quiz', 'problem', sessionId, problemId],
        enabled: !!sessionId && !!problemId,
        staleTime: Infinity,
    });

    const [selectedChoiceId, setSelectedChoiceId] = useState<number | null>(null);

    useEffect(() => {
        setSelectedChoiceId(null);
    }, [problemId]);

    useEffect(() => {
        if (problem?.choice != null) {
            setSelectedChoiceId(problem.choice);
        }
    }, [problem?.choice]);

    const isAlreadyAnswered = problem?.choice != null;
    const sortedChoices = [...(problem?.choices ?? [])].sort((a, b) => a.order - b.order);

    return {
        problem,
        isLoading,
        sortedChoices,
        selectedChoiceId,
        setSelectedChoiceId,
        isAlreadyAnswered,
    };
};

export default useQuizProblem;
