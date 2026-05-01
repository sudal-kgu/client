import { useEffect, useState } from 'react';

const useExpiredAt = (expiredAt: string | null) => {
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        if (!expiredAt) return;

        const remainingMs = new Date(expiredAt).getTime() - Date.now();

        if (remainingMs <= 0) {
            setIsExpired(true);
            return;
        }

        setIsExpired(false);

        const timer = setTimeout(() => {
            setIsExpired(true);
        }, remainingMs);

        return () => clearTimeout(timer);
    }, [expiredAt]);

    return { isExpired };
};

export default useExpiredAt;
