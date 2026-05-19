import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

import BuildingAPI from '../building';
import type {
    Currency,
    IActivatedSlot,
    IBuildingMoveRequest,
    IInactivatedSlot,
    ISlotsResponse,
    Response,
} from '../types';

const useBuilding = () => {
    const queryClient = useQueryClient();

    const updateSlotCache = (slot: IActivatedSlot | IInactivatedSlot) => {
        queryClient.setQueryData<ISlotsResponse>(['slots'], (prev) =>
            prev
                ? {
                      ...prev,
                      slots: prev.slots.map((s) => (s.slotNumber === slot.slotNumber ? slot : s)),
                  }
                : prev,
        );
    };

    const updateCurrencyCache = (resource: Currency) => {
        queryClient.setQueryData(['currency'], resource);
    };

    const { data: catalogs = [], isLoading } = useQuery({
        queryKey: ['building-catalogs'],
        queryFn: BuildingAPI.getCatalogs,
    });

    const { mutate: createBuilding, isPending: isCreating } = useMutation({
        mutationFn: ({
            slotNumber,
            buildingMetadataId,
        }: {
            slotNumber: number;
            buildingMetadataId: number;
        }) => BuildingAPI.createBuilding(slotNumber, buildingMetadataId),
        onSuccess: ({ slot, resource }) => {
            updateSlotCache(slot);
            updateCurrencyCache(resource);
        },
        onError: (error: AxiosError<Response<unknown>>) => {
            toast.error(error.response?.data?.message ?? error.message);
        },
    });

    const { mutate: operate, isPending: isOperating } = useMutation({
        mutationFn: BuildingAPI.operate,
        onSuccess: ({ slot, resources }) => {
            updateSlotCache(slot);
            updateCurrencyCache(resources);
        },
        onError: (error: AxiosError<Response<unknown>>) => {
            toast.error(error.response?.data?.message ?? error.message);
        },
    });

    const { mutate: harvest, isPending: isHarvesting } = useMutation({
        mutationFn: BuildingAPI.harvest,
        onSuccess: ({ building, resource, slots }, slotNumber) => {
            slots.forEach(updateSlotCache);
            queryClient.setQueryData<Currency>(['currency'], (prev) =>
                prev ? { ...prev, gem: resource.gem } : prev,
            );
            queryClient.setQueryData(['harvest-amount', slotNumber], { gem: building.gem });
        },
        onError: (error: AxiosError<Response<unknown>>) => {
            toast.error(error.response?.data?.message ?? error.message);
        },
    });

    const { mutate: removeBuilding, isPending: isRemoving } = useMutation({
        mutationFn: BuildingAPI.deleteBuilding,
        onSuccess: ({ slot, resource }) => {
            updateSlotCache(slot);
            updateCurrencyCache(resource);
        },
        onError: (error: AxiosError<Response<unknown>>) => {
            toast.error(error.response?.data?.message ?? error.message);
        },
    });

    const { mutate: moveBuilding, isPending: isMoving } = useMutation({
        mutationFn: (move: IBuildingMoveRequest) => BuildingAPI.move(move),
        onSuccess: ({ fromSlot, toSlot }) => {
            updateSlotCache(fromSlot);
            updateSlotCache(toSlot);
        },
        onError: (error: AxiosError<Response<unknown>>) => {
            toast.error(error.response?.data?.message ?? error.message);
        },
    });

    const isBusy = isOperating || isHarvesting || isRemoving || isMoving;

    return {
        catalogs,
        isLoading,
        createBuilding,
        isCreating,
        operate,
        harvest,
        removeBuilding,
        moveBuilding,
        isMoving,
        isBusy,
    };
};

export default useBuilding;
