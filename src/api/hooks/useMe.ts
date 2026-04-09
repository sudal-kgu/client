import { useQuery } from '@tanstack/react-query';

import MemberAPI from '../member';

const useMe = () => {
    const { data: me = null, isLoading } = useQuery({ queryFn: MemberAPI.me, queryKey: ['me'] });
    return { me, isLoading };
};

export default useMe;
