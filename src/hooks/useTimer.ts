import { useEffect, useState } from 'react';

const useTimer = (expiredAt: string | undefined) => {
    const [remainingMs, setRemainingMs] = useState(0);
    const [totalMs, setTotalMs] = useState(0);
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        if (!expiredAt) {
            setRemainingMs(0);
            setTotalMs(0);
            setIsExpired(false);
            return;
        }

        const expiredTime = new Date(expiredAt).getTime();
        const getRemainingMs = () => Math.max(0, expiredTime - Date.now());

        const initMs = getRemainingMs();
        setTotalMs(initMs || 1);
        setRemainingMs(initMs);
        setIsExpired(initMs === 0);

        if (initMs === 0) return;

        const interval = setInterval(() => {
            const ms = getRemainingMs();
            setRemainingMs(ms);
            setIsExpired(ms === 0);
        }, 100);

        return () => clearInterval(interval);
    }, [expiredAt]);

    return {
        displaySeconds: Math.ceil(remainingMs / 1000),
        ratio: totalMs > 0 ? remainingMs / totalMs : 1,
        isExpired,
    };
};

export default useTimer;
