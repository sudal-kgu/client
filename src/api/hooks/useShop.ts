import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

import ShopAPI from '../shop';
import { CurrencyType } from '../types';
import type { Currency, Island, Item, Response } from '../types';

const useShop = () => {
    const queryClient = useQueryClient();

    const { data: items = [], isLoading } = useQuery({
        queryKey: ['shop-items'],
        queryFn: ShopAPI.getItems,
    });

    const { mutate: purchase, isPending: isPurchasing } = useMutation({
        mutationFn: ShopAPI.purchase,
        onSuccess: ({ itemId, itemName, remainingShell, currentCount, expReward }) => {
            toast.success(`"${itemName}"를 구매했습니다.`);
            queryClient.setQueryData<Item[]>(['shop-items'], (prev) =>
                prev?.map((item) => (item.itemId === itemId ? { ...item, currentCount } : item)),
            );

            queryClient.setQueryData<Currency>(['currency'], (prev) =>
                prev ? { ...prev, [CurrencyType.SHELL]: remainingShell } : prev,
            );

            queryClient.setQueryData<Island>(['me'], (prev) =>
                prev
                    ? {
                          ...prev,
                          recyclingContributionExp: prev.recyclingContributionExp + expReward,
                          cumulativeExp: prev.cumulativeExp + expReward,
                      }
                    : prev,
            );
        },
        onError: (error: AxiosError<Response<unknown>>) => {
            toast.error(error.response?.data?.message ?? error.message);
        },
    });

    return { items, isLoading, purchase, isPurchasing };
};

export default useShop;
