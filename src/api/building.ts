import api from './axios';
import type {
    Currency,
    IActivatedSlot,
    IBuildingCatalog,
    IInactivatedSlot,
    Response,
} from './types';

const BuildingAPI = {
    getCatalogs: async () => {
        const result = await api.get<Response<IBuildingCatalog[]>>('/v1/buildings/catalog');
        return result.data.data;
    },
    createBuilding: async (slotNumber: number, buildingMetadataId: number) => {
        const result = await api.post<Response<{ slot: IActivatedSlot; resource: Currency }>>(
            `/v1/slots/${slotNumber}/buildings`,
            {
                buildingMetadataId,
            },
        );
        return result.data.data;
    },
    deleteBuilding: async (slotNumber: number) => {
        const result = await api.delete<Response<{ slot: IInactivatedSlot; resource: Currency }>>(
            `/v1/slots/${slotNumber}/buildings`,
        );
        return result.data.data;
    },
    operate: async (slotNumber: number) => {
        await api.post<Response<void>>(`/v1/buildings/${slotNumber}/operate`);
    },
    harvest: async (slotNumber: number) => {
        const result = await api.post<Response<Number>>(`/v1/buildings/${slotNumber}/harvest`);
        return result.data.data;
    },
};

export default BuildingAPI;
