import api from './axios';
import type { QuizProblem, QuizSession, Response } from './types';

const QuizAPI = {
    createSession: async (serial: string) => {
        const result = await api.post<Response<QuizSession>>('/v1/quizzes/sessions', { serial });
        return result.data.data;
    },
    getProblems: async (sessionId: number) => {
        const result = await api.get<Response<QuizProblem[]>>(
            `/v1/quizzes/sessions/${sessionId}/problems`,
        );
        return result.data.data;
    },
    getProblem: async (sessionId: number, problemId: number) => {
        const result = await api.get<Response<QuizProblem>>(
            `/v1/quizzes/sessions/${sessionId}/problems/${problemId}`,
        );
        return result.data.data;
    },
    submitAnswer: async (sessionId: number, problemId: number, choice: number) => {
        const result = await api.post<Response<QuizProblem>>(
            `/v1/quizzes/sessions/${sessionId}/problems/${problemId}`,
            { choice },
        );
        return result.data.data;
    },
    completeSession: async (sessionId: number) => {
        await api.post(`/v1/quizzes/sessions/${sessionId}/complete`);
    },
};

export default QuizAPI;
