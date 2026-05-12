import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

import SlotAPI from '../slot';
import type { Currency, ISlotsResponse, Response } from '../types';

const useSlot = () => {
    const queryClient = useQueryClient();

    const { data, isLoading, isSuccess, error } = useQuery({
        queryKey: ['slots'],
        queryFn: SlotAPI.getSlots,
    });

    const slots = data?.slots ?? [];
    const maxActivatableSlots = data?.maxActivatableSlots ?? 0;

    const { data: activateCost } = useQuery({
        queryKey: ['slot-activate-cost'],
        queryFn: SlotAPI.getActivateCost,
    });

    const { mutate: activateSlot, isPending: isActivating } = useMutation({
        mutationFn: SlotAPI.activateSlot,
        onSuccess: ({ slot, resource, nextCost }) => {
            queryClient.setQueryData<ISlotsResponse>(['slots'], (prev) =>
                prev
                    ? {
                          ...prev,
                          slots: prev.slots.map((s) =>
                              s.slotNumber === slot.slotNumber ? slot : s,
                          ),
                      }
                    : prev,
            );
            queryClient.setQueryData<Currency>(['currency'], resource);
            queryClient.setQueryData(['slot-activate-cost'], nextCost);
        },
        onError: (error: AxiosError<Response<unknown>>) => {
            toast.error(error.response?.data?.message ?? error.message);
        },
    });

    return {
        slots,
        maxActivatableSlots,
        activateCost,
        isLoading: isLoading || !isSuccess,
        error,
        activateSlot,
        isActivating,
    };
};

export default useSlot;
