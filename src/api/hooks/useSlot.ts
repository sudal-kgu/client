import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import SlotAPI from '../slot';

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
    });

    return { slots, isLoading: isLoading || !isSuccess, error, activateSlot, isActivating };
};

export default useSlot;
