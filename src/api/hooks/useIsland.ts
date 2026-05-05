import { useEffect } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import useIslandCraeteModal from '../../hooks/store/useIslandCreateModal';
import MemberAPI from '../member';
import type { Island } from '../types';

const useIsland = () => {
    const { isOpen, setIsOpen } = useIslandCraeteModal();
    const queryClient = useQueryClient();
    const {
        data: island = null,
        isLoading,
        error,
    } = useQuery<Island, AxiosError>({ queryFn: MemberAPI.me, queryKey: ['me'] });
    const { mutate } = useMutation<Island, AxiosError, { nickname: string }>({
        mutationFn: ({ nickname }) => MemberAPI.createMe(nickname),
        onSuccess: (newIslandData) => {
            queryClient.setQueryData(['me'], newIslandData);
            setIsOpen(false);
        },
    });

    useEffect(() => {
        if (error?.status !== 404) return;
        setIsOpen(true);
    }, [error, setIsOpen]);

    return { island, isLoading, error, createIsland: mutate, hasIsland: !isOpen };
};

export default useIsland;
