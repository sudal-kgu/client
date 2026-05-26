import { useEffect } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router-dom';

import useLevelUpNoticeModal from '../../hooks/store/useLevelUpNoticeModal';
import QuizAPI from '../quiz';
import type { QuizProblem, QuizSessionComplete } from '../types';

interface LocationState {
    result: QuizSessionComplete;
}

const useQuizComplete = () => {
    const { sessionId } = useParams();
    const location = useLocation();
    const queryClient = useQueryClient();
    const openLevelUpModal = useLevelUpNoticeModal((s) => s.open);

    const state = location.state as LocationState | null;
    const result = state?.result ?? null;

    const { data: problems = [] } = useQuery<QuizProblem[]>({
        queryFn: () => QuizAPI.getProblems(Number(sessionId)),
        queryKey: ['quiz', 'problems', sessionId],
        enabled: !!sessionId,
    });

    const correctCount = problems.filter((p) => p.choice !== null && p.choice === p.answer).length;

    useEffect(() => {
        if (!result) return;
        queryClient.setQueryData(['me'], result.island);
        queryClient.setQueryData(['currency'], result.resource);
        queryClient.removeQueries({ queryKey: ['quiz', 'session'] });
    }, [result, queryClient]);

    useEffect(() => {
        if (!result?.notice) return;
        const { unlockedItems, unlockedBuildings } = result.notice;
        if (unlockedItems.length > 0 || unlockedBuildings.length > 0) {
            openLevelUpModal({ unlockedItems, unlockedBuildings });
        }
    }, [result, openLevelUpModal]);

    return { result, problems, correctCount };
};

export default useQuizComplete;
