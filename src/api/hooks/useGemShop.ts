import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

import ShopAPI from '../shop';
import { CurrencyType } from '../types';
import type { Currency, Response } from '../types';

const useGemShop = () => {
    const queryClient = useQueryClient();

    const { data: gemItems = [], isLoading } = useQuery({
        queryKey: ['gem-items'],
        queryFn: ShopAPI.getGemItems,
    });

    const { mutate: exchange, isPending: isExchanging } = useMutation({
        mutationFn: ShopAPI.exchangeGemItem,
        onSuccess: ({ gemItemName, remainingGem }) => {
            toast.success(`"${gemItemName}" 교환이 완료되었습니다.`);

            queryClient.setQueryData<Currency>(['currency'], (prev) =>
                prev ? { ...prev, [CurrencyType.GEM]: remainingGem } : prev,
            );
        },
        onError: (error: AxiosError<Response<unknown>>) => {
            toast.error(error.response?.data?.message ?? error.message);
        },
    });

    return { gemItems, isLoading, exchange, isExchanging };
};

export default useGemShop;
