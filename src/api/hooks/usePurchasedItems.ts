import { useQuery } from '@tanstack/react-query';

import { GARBAGE_SPAWN_POINTS } from '../../components/island/model/config';
import MemberAPI from '../member';

const usePurchasedItems = () => {
    const { data: items = [], isLoading } = useQuery({
        queryKey: ['purchased-items'],
        queryFn: MemberAPI.itemUsages,
    });

    const garbageItem = items.find((item) => item.name === '쓰레기 제거 (소)');
    const removalRatio =
        garbageItem && garbageItem.maxCount > 0
            ? garbageItem.currentCount / garbageItem.maxCount
            : 0;
    const visibleGarbage = GARBAGE_SPAWN_POINTS.slice(
        0,
        Math.round(GARBAGE_SPAWN_POINTS.length * (1 - removalRatio)),
    );

    return { items, isLoading, visibleGarbage };
};

export default usePurchasedItems;
