import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import BuildingAPI from '../building';
import type { Currency, IActivatedSlot, IInactivatedSlot } from '../types';

type SlotCache = (IActivatedSlot | IInactivatedSlot)[];

const useBuilding = () => {
    const queryClient = useQueryClient();

    const updateSlotCache = (slot: IActivatedSlot | IInactivatedSlot) => {
        queryClient.setQueryData<SlotCache>(['slots'], (prev) =>
            prev?.map((s) => (s.slotNumber === slot.slotNumber ? slot : s)),
        );
    };

    const updateCurrencyCache = (resource: Currency) => {
        queryClient.setQueryData(['currency'], resource);
    };

    const invalidateSlots = () => queryClient.invalidateQueries({ queryKey: ['slots'] });
    const invalidateCurrency = () => queryClient.invalidateQueries({ queryKey: ['currency'] });

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
    });

    const { mutate: operate, isPending: isOperating } = useMutation({
        mutationFn: BuildingAPI.operate,
        onSuccess: () => {
            invalidateSlots();
            invalidateCurrency();
        },
    });

    const { mutate: harvest, isPending: isHarvesting } = useMutation({
        mutationFn: BuildingAPI.harvest,
        onSuccess: () => {
            invalidateSlots();
            invalidateCurrency();
        },
    });

    const { mutate: removeBuilding, isPending: isRemoving } = useMutation({
        mutationFn: BuildingAPI.deleteBuilding,
        onSuccess: ({ slot, resource }) => {
            updateSlotCache(slot);
            updateCurrencyCache(resource);
        },
    });

    const isBusy = isOperating || isHarvesting || isRemoving;

    return {
        catalogs,
        isLoading,
        createBuilding,
        isCreating,
        operate,
        harvest,
        removeBuilding,
        isBusy,
    };
};

export default useBuilding;
