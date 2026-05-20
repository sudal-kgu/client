import { useQuery } from '@tanstack/react-query';

import {
    GARBAGE_LARGE_SPAWN_POINTS,
    GARBAGE_SPAWN_POINTS,
} from '../../components/island/model/config';
import MemberAPI from '../member';

const usePurchasedItems = () => {
    const { data: items = [], isLoading } = useQuery({
        queryKey: ['purchased-items'],
        queryFn: MemberAPI.itemUsages,
    });

    const smallItem = items.find((item) => item.name === '쓰레기 제거 (소)');
    const smallRatio =
        smallItem && smallItem.maxCount > 0 ? smallItem.currentCount / smallItem.maxCount : 0;

    const largeItem = items.find((item) => item.name === '쓰레기 제거 (대)');
    const largeRatio =
        largeItem && largeItem.maxCount > 0 ? largeItem.currentCount / largeItem.maxCount : 0;

    const visibleGarbage = [
        ...GARBAGE_SPAWN_POINTS.slice(
            0,
            Math.round(GARBAGE_SPAWN_POINTS.length * (1 - smallRatio)),
        ),
        ...GARBAGE_LARGE_SPAWN_POINTS.slice(
            0,
            Math.round(GARBAGE_LARGE_SPAWN_POINTS.length * (1 - largeRatio)),
        ),
    ];

    return { items, isLoading, visibleGarbage };
};

export default usePurchasedItems;
