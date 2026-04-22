import { useQuery } from '@tanstack/react-query';

import TrashesAPI from '../trashes';

const useTrashDetail = (serial: string | undefined) => {
    const { data = null } = useQuery({
        queryFn: () => TrashesAPI.getTrash(serial!),
        queryKey: ['detail', serial],
        enabled: !!serial,
    });
    return { detail: data };
};
export default useTrashDetail;
