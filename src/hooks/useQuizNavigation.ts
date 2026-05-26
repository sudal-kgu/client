import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import useQuizSession from '../api/hooks/useQuizSession';
import QuizAPI from '../api/quiz';

interface Options {
    isExpired: boolean;
    isAlreadyAnswered: boolean;
    selectedChoiceId: number | null;
}

const useQuizNavigation = ({ isExpired, selectedChoiceId, isAlreadyAnswered }: Options) => {
    const { analysisId, trashId, sessionId, problemId } = useParams();
    const navigate = useNavigate();

    const { session } = useQuizSession();
    const problems = session?.problems ?? [];
    const currentIndex = problems.indexOf(Number(problemId));
    const totalCount = problems.length;
    const isLast = totalCount > 0 && currentIndex === totalCount - 1;
    const progress = totalCount > 0 ? (currentIndex / totalCount) * 100 : 0;

    const { mutateAsync: submitAnswer, isPending: isSubmitting } = useMutation({
        mutationFn: (choiceId: number) =>
            QuizAPI.submitAnswer(Number(sessionId), Number(problemId), choiceId),
    });

    const { mutateAsync: completeSession, isPending: isCompleting } = useMutation({
        mutationFn: () => QuizAPI.completeSession(Number(sessionId)),
    });

    const canGoNext = isExpired || isAlreadyAnswered || selectedChoiceId !== null;
    const isProcessing = isSubmitting || isCompleting;

    const handleNext = async () => {
        if (!canGoNext || isProcessing) return;

        if (!isExpired && !isAlreadyAnswered && selectedChoiceId !== null) {
            await submitAnswer(selectedChoiceId);
        }

        if (isLast) {
            await completeSession();
            navigate(`/analysis/${analysisId}/trashes/${trashId}/checklist`, { replace: true });
            return;
        }

        const nextProblemId = problems[currentIndex + 1];
        navigate(
            `/analysis/${analysisId}/trashes/${trashId}/quiz/${sessionId}/problems/${nextProblemId}`,
        );
    };

    return { currentIndex, totalCount, progress, isLast, canGoNext, isProcessing, handleNext };
};

export default useQuizNavigation;
