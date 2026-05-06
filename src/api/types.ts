import { z } from 'zod/v3';

export interface Response<T> {
    code: string;
    data: T;
    message: string;
}

export interface AnalaysisRequest {
    request_id: string;
}

export interface AnalaysisResultPage {
    totalPage: number;
    currentPage: number;
    content: AnalaysisResultItem[];
    totalItems: number;
}
export interface AnalaysisResultItem {
    uuid: string;
    image: string;
    category: string;
    subcategory: string;
}
export interface TrashDetail {
    category: string;
    subcategory: string;
    image: string;
    disposal: {
        category: string[];
        subcategory?: string[];
    };
}

export interface Confirm {
    serial: string;
}

export interface Island {
    cumulativeExp: number;
    itemContributionExp: number;
    level: number;
    nickname: string;
    recyclingContributionExp: number;
}

const TrashItemSchema = z.object({
    trashUuid: z.string(),
    filename: z.string(),
    category: z.string(),
    subcategory: z.string(),
});

export const ResultSchema = z.object({
    request_id: z.string(),
    trash_items: z.array(TrashItemSchema),
});

export const createResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
    z.object({
        code: z.string(),
        message: z.string(),
        data: dataSchema,
    });

export type AnalysisResult = z.infer<typeof ResultSchema>;
export type AnalysisItem = z.infer<typeof TrashItemSchema>;

export interface QuizChoice {
    id: number;
    description: string;
    order: number;
}

export interface QuizProblem {
    sessionId: number;
    problemId: number;
    description: string;
    choices: QuizChoice[];
    expiredAt: string | null;
    answer: number;
    choice?: number | null;
}

export interface QuizSession {
    sessionId: number;
    problems: number[];
}
