import api from './axios';
import type {
    IBuildingCatalog,
    IBuildingMoveRequest,
    IBuildingMoveResponse,
    ICreateBuildingResponse,
    IDeleteBuildingResponse,
    IHarvestResponse,
    IOperateResponse,
    Response,
} from './types';

const BuildingAPI = {
    getCatalogs: async () => {
        const result = await api.get<Response<IBuildingCatalog[]>>('/v1/buildings/catalog');
        return result.data.data;
    },
    createBuilding: async (slotNumber: number, buildingMetadataId: number) => {
        const result = await api.post<Response<ICreateBuildingResponse>>(
            `/v1/slots/${slotNumber}/buildings`,
            { buildingMetadataId },
        );
        return result.data.data;
    },
    deleteBuilding: async (slotNumber: number) => {
        const result = await api.delete<Response<IDeleteBuildingResponse>>(
            `/v1/slots/${slotNumber}/buildings`,
        );
        return result.data.data;
    },
    move: async (move: IBuildingMoveRequest) => {
        const result = await api.post<Response<IBuildingMoveResponse>>('/v1/buildings/move', move);
        return result.data.data;
    },
    costOfOperate: async (slotNumber: number) => {
        const result = await api.get<Response<{ fuels: number }>>(
            `/v1/slots/${slotNumber}/buildings/operations`,
        );
        return result.data.data;
    },
    operate: async (slotNumber: number) => {
        const result = await api.post<Response<IOperateResponse>>(
            `/v1/slots/${slotNumber}/buildings/operations`,
        );
        return result.data.data;
    },
    harvest: async (slotNumber: number) => {
        const result = await api.post<Response<IHarvestResponse>>(
            `/v1/slots/${slotNumber}/buildings/operations/harvest`,
        );
        return result.data.data;
    },
    getAmountOfHarvest: async (slotNumber: number) => {
        const result = await api.get<Response<{ gem: number }>>(
            `/v1/slots/${slotNumber}/buildings/operations/harvest`,
        );
        return result.data.data;
    },
};

export default BuildingAPI;
