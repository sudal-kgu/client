import api from './axios';
import type { QuizProblem, QuizSession } from './types';

const QuizAPI = {
    createSession: async (serial: string) => {
        const result = await api.post<QuizSession>('/v1/quizzes/sessions', { serial });
        return result.data;
    },
    getSession: async () => {
        const result = await api.get<QuizSession>('/v1/quizzes/sessions');
        return result.data;
    },
    getProblems: async (sessionId: number) => {
        const result = await api.get<QuizProblem[]>(`/v1/quizzes/sessions/${sessionId}/problems`);
        return result.data;
    },
    getProblem: async (sessionId: number, problemId: number) => {
        const result = await api.get<QuizProblem>(
            `/v1/quizzes/sessions/${sessionId}/problems/${problemId}`,
        );
        return result.data;
    },
    submitAnswer: async (sessionId: number, problemId: number, choice: number) => {
        const result = await api.post<QuizProblem>(
            `/v1/quizzes/sessions/${sessionId}/problems/${problemId}`,
            { choice },
        );
        return result.data;
    },
    completeSession: async (sessionId: number) => {
        await api.post(`/v1/quizzes/sessions/${sessionId}/complete`);
    },
};

export default QuizAPI;
