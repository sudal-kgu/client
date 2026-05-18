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
}

export interface IBuildingMoveRequest {
    fromSlotNumber: number;
    toSlotNumber: number;
}

export interface IBuildingMoveResponse {
    fromSlot: IActivatedSlot | IInactivatedSlot;
    toSlot: IActivatedSlot | IInactivatedSlot;
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

export const enum Region {
    SEOUL = 'SEOUL',
    INCHEON = 'INCHEON',
    GYEONGGI = 'GYEONGGI',
    GANGWON = 'GANGWON',
    DAEJEON = 'DAEJEON',
    SEJONG = 'SEJONG',
    CHUNGBUK = 'CHUNGBUK',
    CHUNGNAM = 'CHUNGNAM',
    BUSAN = 'BUSAN',
    DAEGU = 'DAEGU',
    ULSAN = 'ULSAN',
    GWANGJU = 'GWANGJU',
    GYEONGBUK = 'GYEONGBUK',
    GYEONGNAM = 'GYEONGNAM',
    JEONBUK = 'JEONBUK',
    JEONNAM = 'JEONNAM',
    JEJU = 'JEJU',
}

export const REGION_LABELS: Record<Region, string> = {
    [Region.SEOUL]: '서울',
    [Region.INCHEON]: '인천',
    [Region.GYEONGGI]: '경기',
    [Region.GANGWON]: '강원',
    [Region.DAEJEON]: '대전',
    [Region.SEJONG]: '세종',
    [Region.CHUNGBUK]: '충북',
    [Region.CHUNGNAM]: '충남',
    [Region.BUSAN]: '부산',
    [Region.DAEGU]: '대구',
    [Region.ULSAN]: '울산',
    [Region.GWANGJU]: '광주',
    [Region.GYEONGBUK]: '경북',
    [Region.GYEONGNAM]: '경남',
    [Region.JEONBUK]: '전북',
    [Region.JEONNAM]: '전남',
    [Region.JEJU]: '제주',
};
