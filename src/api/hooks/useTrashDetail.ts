import { useQuery } from '@tanstack/react-query';

import TrashesAPI from '../trashes';

const useTrashDetail = (serial: string) => {
    const { data = null } = useQuery({
        queryFn: () => TrashesAPI.getTrash(serial),
        queryKey: ['detail', serial],
    });

    return { detail: data };
};

export default useTrashDetail;
