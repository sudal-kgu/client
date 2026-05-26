import { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import useQuizSession from '../api/hooks/useQuizSession';
import PageContainer from '../components/common/PageContainer';
import Spinner from '../components/common/Spinner';

const Quiz = () => {
    const { analysisId, trashId, sessionId } = useParams();
    const navigate = useNavigate();
    const { session, isLoading } = useQuizSession();

    useEffect(() => {
        if (!session || !sessionId || !analysisId || !trashId) return;

        const startProblemId =
            session.unsolved.length > 0 ? session.unsolved[0] : session.problems[0];

        if (startProblemId) {
            navigate(
                `/analysis/${analysisId}/trashes/${trashId}/quiz/${sessionId}/problems/${startProblemId}`,
                { replace: true },
            );
        }
    }, [session, sessionId, analysisId, trashId, navigate]);

    return (
        <PageContainer backTo={`/analysis/${analysisId}`}>{isLoading && <Spinner />}</PageContainer>
    );
};

export default Quiz;
