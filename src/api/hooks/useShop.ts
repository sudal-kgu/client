import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

import useLevelUpNoticeModal from '../../hooks/store/useLevelUpNoticeModal';
import ShopAPI from '../shop';
import { CurrencyType } from '../types';
import type { Currency, ISlotsResponse, Island, Item, Response } from '../types';

const useShop = () => {
    const queryClient = useQueryClient();
    const { open: openNotice } = useLevelUpNoticeModal();

    const { data: items = [], isLoading } = useQuery({
        queryKey: ['shop-items'],
        queryFn: ShopAPI.getItems,
    });

    const { mutate: purchase, isPending: isPurchasing } = useMutation({
        mutationFn: ShopAPI.purchase,
        onSuccess: ({ island, notice, purchased }) => {
            toast.success(`"${purchased.itemName}"를 구매했습니다.`);

            queryClient.setQueryData<Item[]>(['shop-items'], (prev) =>
                prev?.map((item) =>
                    item.itemId === purchased.itemId
                        ? { ...item, currentCount: purchased.currentCount }
                        : item,
                ),
            );

            queryClient.setQueryData<Item[]>(['purchased-items'], (prev) =>
                prev?.map((item) =>
                    item.itemId === purchased.itemId
                        ? { ...item, currentCount: purchased.currentCount }
                        : item,
                ),
            );

            queryClient.setQueryData<Currency>(['currency'], (prev) =>
                prev ? { ...prev, [CurrencyType.SHELL]: purchased.remainingShell } : prev,
            );

            queryClient.setQueryData<Island>(['me'], island);

            if (notice) {
                if (notice.maxSlotCount != null) {
                    queryClient.setQueryData<ISlotsResponse>(['slots'], (prev) =>
                        prev ? { ...prev, maxActivatableSlots: notice.maxSlotCount } : prev,
                    );
                }

                if (notice.unlockedItems.length > 0 || notice.unlockedBuildings.length > 0) {
                    openNotice(notice);
                }
            }
        },
        onError: (error: AxiosError<Response<unknown>>) => {
            toast.error(error.response?.data?.message ?? error.message);
        },
    });

    return { items, isLoading, purchase, isPurchasing };
};

export default useShop;
