import { useEffect, useRef, useState } from 'react';

const useExpiredAt = (expiredAt: string | null, resetKey?: unknown) => {
    const [isExpired, setIsExpired] = useState(false);
    const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        if (!expiredAt) {
            setIsExpired(false);
            setRemainingSeconds(null);
            return;
        }

        const getRemainingMs = () => new Date(expiredAt).getTime() - Date.now();
        const getRemainingSec = () => Math.max(0, Math.ceil(getRemainingMs() / 1000));

        const remainingMs = getRemainingMs();

        if (remainingMs <= 0) {
            setIsExpired(true);
            setRemainingSeconds(0);
            return;
        }

        setIsExpired(false);
        setRemainingSeconds(getRemainingSec());

        intervalRef.current = setInterval(() => {
            const sec = getRemainingSec();
            setRemainingSeconds(sec);
            if (sec <= 0 && intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }, 1000);

        timeoutRef.current = setTimeout(() => {
            setIsExpired(true);
            setRemainingSeconds(0);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }, remainingMs);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, [expiredAt, resetKey]);

    return { isExpired, remainingSeconds };
};

export default useExpiredAt;
