import { useQuery } from '@tanstack/react-query';

import CurrencyAPI from '../currency';

const useCurrency = () => {
    const {
        data: currency = { shell: 0, gem: 0, fuel: 0 },
        isLoading,
        isSuccess,
    } = useQuery({ queryKey: ['currency'], queryFn: CurrencyAPI.get });
    return { currency, isLoading: isLoading || !isSuccess };
};

export default useCurrency;
