import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

import SlotAPI from '../slot';
import type { Response } from '../types';

const useSlot = () => {
    const queryClient = useQueryClient();

    const {
        data: slots = [],
        isLoading,
        isSuccess,
        error,
    } = useQuery({
        queryKey: ['slots'],
        queryFn: SlotAPI.getSlots,
    });

    const { mutate: activateSlot, isPending: isActivating } = useMutation({
        mutationFn: SlotAPI.activateSlot,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['slots'] });
        },
        onError: (error: AxiosError<Response<unknown>>) => {
            toast.error(error.response?.data?.message ?? error.message);
        },
    });

    return { slots, isLoading: isLoading || !isSuccess, error, activateSlot, isActivating };
};

export default useSlot;
