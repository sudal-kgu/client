import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import QuizAPI from '../api/quiz';

const useQuizProblem = () => {
    const { analysisId, sessionId, problemId } = useParams();
    const navigate = useNavigate();

    const {
        data: problem,
        isLoading,
        error,
    } = useQuery({
        queryFn: () => QuizAPI.getProblem(Number(sessionId), Number(problemId)),
        queryKey: ['quiz', 'problem', sessionId, problemId],
        enabled: !!sessionId && !!problemId,
        staleTime: Infinity,
        retry: false,
    });

    useEffect(() => {
        if (!error || !analysisId) return;
        if (
            isAxiosError(error) &&
            (error.response?.status === 404 || error.response?.status === 410)
        ) {
            navigate(`/analysis/${analysisId}`, { replace: true });
        }
    }, [error, navigate, analysisId]);

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
