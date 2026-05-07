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

export interface ISlot {
    slotNumber: number;
}

export interface IInactivatedSlot extends ISlot {
    activated: false;
    building: null;
    resource: {
        resourceType: 'SHELL';
        unlockCost: number;
    };
}

export interface IBuilding {
    buildingId: number;
    buildingMetadataId: number;
    category: BuildingType;
    name: string;
    model: string;
    fuelExpiredAt: string | null;
}

export interface IActivatedSlot extends ISlot {
    activated: true;
    building: IBuilding | null;
}

export const enum BuildingType {
    PRODUCTION = 'PRODUCTION',
    PURIFICATION = 'PURIFICATION',
}

export interface IBuildingCatalog {
    buildingMetadataId: number;
    category: BuildingType;
    costGems: number;
    costShells: number;
    model: string;
    name: string;
    pph: number;
    requiredLevel: number;
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
