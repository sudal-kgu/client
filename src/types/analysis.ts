export type TrashItem = {
    trashUuid: string;
    filename: string;
    category: string;
    subcategory: string;
};

export type AnalysisResult = {
    emptyItems: boolean;
    request_id: string;
    trash_items: TrashItem[];
};

export type UploadImageResponse = {
    code: string;
    message: string;
    data: string;
};

export type AnalysisResultResponse = {
    code: string;
    message: string;
    data: AnalysisResult;
};
