import { useQuery } from '@tanstack/react-query';

import MemberAPI from '../member';

const usePurchasedItems = () => {
    const { data: items = [], isLoading } = useQuery({
        queryKey: ['purchased-items'],
        queryFn: MemberAPI.itemUsages,
    });

    return { items, isLoading };
};

export default usePurchasedItems;
