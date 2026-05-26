import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import QuizAPI from '../quiz';

const QUIZ_SESSION_KEY = ['quiz', 'session'];

interface Options {
    enabled?: boolean;
}

const useQuizSession = ({ enabled = true }: Options = {}) => {
    const { analysisId, trashId } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: session, isLoading } = useQuery({
        queryFn: () => QuizAPI.getActivateSession(),
        queryKey: QUIZ_SESSION_KEY,
        enabled,
    });

    const { mutate: createSession, isPending: isCreating } = useMutation({
        mutationFn: (serial: string) => QuizAPI.createSession(serial),
        onSuccess: (newSession) => {
            queryClient.setQueryData(QUIZ_SESSION_KEY, newSession);

            if (!newSession.isNew) {
                toast.info('기존 활성화된 세션으로 이동합니다.');
            }

            navigate(`/analysis/${analysisId}/trashes/${trashId}/quiz/${newSession.sessionId}`);
        },
    });

    return { session: session ?? null, isLoading, createSession, isCreating };
};

export default useQuizSession;
