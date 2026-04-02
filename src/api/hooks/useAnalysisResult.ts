import { useInfiniteQuery } from '@tanstack/react-query';

import AnalysisAPI from '../analysis';

interface Option {
    id: string;
    size: number;
}

const useAnalysisResult = ({ id, size }: Option) => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryFn: ({ pageParam }) => AnalysisAPI.getResult(id, pageParam, size),
        queryKey: ['analysisResult', id],
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
            lastPage.currentPage < lastPage.totalPage ? lastPage.currentPage + 1 : undefined,
    });

    const results = data?.pages.flatMap((page) => page.content) ?? [];
    const totalItems = data?.pages?.[0].totalItems ?? 0;

    return { results, fetchNextPage, isFetching: isFetchingNextPage, hasNextPage, totalItems };
};

export default useAnalysisResult;
