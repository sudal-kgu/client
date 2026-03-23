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
}
export interface AnalaysisResultItem {
    uuid: string;
    image: string;
    category: string;
    subcategory: string;
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
