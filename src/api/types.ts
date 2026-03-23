import { z } from 'zod/v3';

export interface Response<T> {
    code: string;
    data: T;
    message: string;
}

export interface AnalysisRequest {
    request_id: string;
}

const TrashItemSchema = z.object({
    trashUuid: z.string(),
    filename: z.string(),
    category: z.string(),
    subcategory: z.string(),
});

export const ResultSchema = z.object({
    requestId: z.string(),
    trashItems: z.array(TrashItemSchema),
});

export type AnalysisResult = z.infer<typeof ResultSchema>;
export type AnalysisItem = z.infer<typeof TrashItemSchema>;
