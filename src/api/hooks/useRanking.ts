import { useInfiniteQuery } from '@tanstack/react-query';

import MemberAPI from '../member';
import type { Region } from '../types';

const useRanking = (region: Region | undefined, size: number) => {
    const query = useInfiniteQuery({
        queryKey: ['rankings', region ?? 'all', size],
        queryFn: ({ pageParam }) => MemberAPI.ranking({ region, page: pageParam, size }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            const { currentPage, totalPage } = lastPage.rankings;
            return currentPage + 1 <= totalPage ? currentPage + 1 : undefined;
        },
    });

    const rankings = query.data?.pages.flatMap((p) => p.rankings.content) ?? [];
    const me = query.data?.pages[0]?.me;

    return {
        rankings,
        me,
        isLoading: query.isLoading,
        isFetchingNextPage: query.isFetchingNextPage,
        hasNextPage: query.hasNextPage,
        fetchNextPage: query.fetchNextPage,
    };
};

export default useRanking;
