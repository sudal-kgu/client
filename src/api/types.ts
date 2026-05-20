import { z } from 'zod/v3';

export interface Response<T> {
    code: string;
    data: T;
    message: string;
}

export interface AnalaysisRequest {
    request_id: string;
}

export interface PageResponse<T> {
    totalPage: number;
    currentPage: number;
    content: T[];
    totalItems: number;
}

export type AnalaysisResultPage = PageResponse<AnalaysisResultItem>;

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
    nextLevel: {
        totalRequiredExp: number;
        recyclingExpLimit: number;
    };
}

export interface Item {
    currentCount: number;
    expReward: number;
    itemId: number;
    maxCount: number;
    name: string;
    price: number;
    purchasable: boolean;
    unlockLevel: number;
}

export interface ShopPurchaseResponse {
    island: Island;
    notice: {
        reachedMaxLevel: boolean;
        maxSlotCount: number;
        unlockedItems: Item[];
        unlockedBuildings: IBuildingCatalog[];
    } | null;
    purchased: {
        itemId: number;
        currentCount: number;
        itemName: string;
        remainingShell: number;
    };
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
}

export interface IBuilding {
    buildingId: number;
    buildingMetadataId: number;
    category: BuildingType;
    name: string;
    model: string;
    fuelExpiredAt: string | null;
    lastCollectedAt: string | null;
}

export interface IBuildingMoveRequest {
    fromSlotNumber: number;
    toSlotNumber: number;
}

export interface IBuildingMoveResponse {
    fromSlot: IActivatedSlot | IInactivatedSlot;
    toSlot: IActivatedSlot | IInactivatedSlot;
}

export interface ICreateBuildingResponse {
    slot: IActivatedSlot;
    resource: Currency;
}

export interface IDeleteBuildingResponse {
    slot: IInactivatedSlot;
    resource: Currency;
}

export interface IOperateResponse {
    slot: IActivatedSlot;
    resources: Currency;
}

export interface IHarvestResponse {
    building: Pick<Currency, CurrencyType.GEM>;
    resource: Pick<Currency, CurrencyType.GEM>;
    slots: (IActivatedSlot | IInactivatedSlot)[];
}

export interface IActivatedSlot extends ISlot {
    activated: true;
    building: IBuilding | null;
}

export interface ISlotsResponse {
    slots: (IActivatedSlot | IInactivatedSlot)[];
    maxActivatableSlots: number;
}

export interface IActivateSlotResponse {
    resource: Currency;
    slot: IActivatedSlot;
    nextCost: Pick<Currency, CurrencyType.SHELL>;
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

export interface IRanking {
    cumulativeExp: number;
    level: number;
    nickname: string;
    rank: number;
    region: Region;
}

export const enum Region {
    SEOUL = 'SEOUL',
    GYEONGGI = 'GYEONGGI',
    GANGWON = 'GANGWON',
    CHUNGBUK = 'CHUNGBUK',
    CHUNGNAM = 'CHUNGNAM',
    GYEONGBUK = 'GYEONGBUK',
    GYEONGNAM = 'GYEONGNAM',
    JEONBUK = 'JEONBUK',
    JEONNAM = 'JEONNAM',
    JEJU = 'JEJU',
}

export interface RegionPath {
    d: string;
    cx: number;
    cy: number;
}

export interface KoreaMapData {
    width: number;
    height: number;
    regions: Partial<Record<Region, RegionPath>>;
}

export const REGION_LABELS: Record<Region, string> = {
    [Region.SEOUL]: '서울',
    [Region.GYEONGGI]: '경기',
    [Region.GANGWON]: '강원',
    [Region.CHUNGBUK]: '충북',
    [Region.CHUNGNAM]: '충남',
    [Region.GYEONGBUK]: '경북',
    [Region.GYEONGNAM]: '경남',
    [Region.JEONBUK]: '전북',
    [Region.JEONNAM]: '전남',
    [Region.JEJU]: '제주',
};
