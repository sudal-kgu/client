import { useEffect } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import useIslandCraeteModal from '../../hooks/store/useIslandCreateModal';
import MemberAPI from '../member';
import type { Island, Region } from '../types';

const useIsland = () => {
    const { isOpen, setIsOpen } = useIslandCraeteModal();
    const queryClient = useQueryClient();
    const {
        data: island = null,
        isLoading,
        error,
    } = useQuery<Island, AxiosError>({ queryFn: MemberAPI.me, queryKey: ['me'] });
    const { mutate } = useMutation<Island, AxiosError, { nickname: string; region: Region }>({
        mutationFn: ({ nickname, region }) => MemberAPI.createMe(nickname, region),
        onSuccess: (newIslandData) => {
            queryClient.setQueryData(['me'], newIslandData);
            setIsOpen(false);
        },
    });

    useEffect(() => {
        if (error?.status !== 404) return;
        setIsOpen(true);
    }, [error, setIsOpen]);

    const clearMe = () => queryClient.removeQueries({ queryKey: ['me'] });

    return { island, isLoading, error, createIsland: mutate, hasIsland: !isOpen, clearMe };
};

export default useIsland;
