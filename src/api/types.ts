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

export interface Currency {
    [CurrencyType.SHELL]: number;
    [CurrencyType.GEM]: number;
    [CurrencyType.FUEL]: number;
}

export const enum CurrencyType {
    SHELL = 'shell',
    GEM = 'gem',
    FUEL = 'fuel',
}

export interface IslandInfo {
    level: number;
    islandName: string;
    recycleExp: number;
    recycleExpCap: number;
    recycleCount: number;
    recycleCountMax: number;
}

export type AnalysisResult = z.infer<typeof ResultSchema>;
export type AnalysisItem = z.infer<typeof TrashItemSchema>;
