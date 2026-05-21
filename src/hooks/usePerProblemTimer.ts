import { useEffect, useRef, useState } from 'react';

const toMs = (expiredAt: string): number => {
    return new Date(expiredAt).getTime();
};

const getRemainingSeconds = (expiredAt: string | null): number => {
    if (!expiredAt) return 20;
    const expiredAtMs = toMs(expiredAt);
    if (Number.isNaN(expiredAtMs)) return 20;
    const ms = expiredAtMs - Date.now();
    return Math.max(0, Math.ceil(ms / 1000));
};

const getTotalSeconds = (expiredAt: string | null): number => {
    if (!expiredAt) return 20;
    const expiredAtMs = toMs(expiredAt);
    if (Number.isNaN(expiredAtMs)) return 20;
    return Math.max(
        1,
        Math.round((expiredAtMs - Date.now()) / 1000) + getRemainingSeconds(expiredAt),
    );
};

const isAlreadyExpired = (expiredAt: string | null): boolean => {
    if (!expiredAt) return false;
    const expiredAtMs = toMs(expiredAt);
    if (Number.isNaN(expiredAtMs)) return false;
    return expiredAtMs - Date.now() <= 0;
};

const usePerProblemTimer = (expiredAt: string | null, onExpire?: () => void) => {
    const [remainingSeconds, setRemainingSeconds] = useState<number>(() =>
        getRemainingSeconds(expiredAt),
    );
    const [totalSeconds] = useState<number>(() => getTotalSeconds(expiredAt));
    const [isExpired, setIsExpired] = useState<boolean>(() => isAlreadyExpired(expiredAt));

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const expiredAtRef = useRef(expiredAt);
    const onExpireRef = useRef(onExpire);
    const firedExpireRef = useRef(false);
    expiredAtRef.current = expiredAt;
    onExpireRef.current = onExpire;

    useEffect(() => {
        firedExpireRef.current = false;

        const clearTimer = () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };

        const sync = () => {
            const currentExpiredAt = expiredAtRef.current;
            if (!currentExpiredAt) return;

            const expiredAtMs = toMs(currentExpiredAt);
            if (Number.isNaN(expiredAtMs)) {
                clearTimer();
                return;
            }

            const remaining = Math.max(0, Math.ceil((expiredAtMs - Date.now()) / 1000));
            setRemainingSeconds(remaining);

            if (remaining <= 0) {
                setIsExpired(true);
                clearTimer();
                if (!firedExpireRef.current) {
                    firedExpireRef.current = true;
                    onExpireRef.current?.();
                }
            }
        };

        if (!expiredAt) {
            setIsExpired(false);
            setRemainingSeconds(20);
            return;
        }

        const parsedMs = toMs(expiredAt);

        if (Number.isNaN(parsedMs)) {
            setIsExpired(false);
            setRemainingSeconds(20);
            return;
        }

        const initial = Math.max(0, Math.ceil((parsedMs - Date.now()) / 1000));

        if (initial <= 0) {
            setIsExpired(true);
            setRemainingSeconds(0);
            if (!firedExpireRef.current) {
                firedExpireRef.current = true;
                onExpireRef.current?.();
            }
            return;
        }

        setRemainingSeconds(initial);
        setIsExpired(false);

        intervalRef.current = setInterval(sync, 500);

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                const currentExpiredAt = expiredAtRef.current;
                if (!currentExpiredAt) return;

                const expiredAtMs = toMs(currentExpiredAt);
                if (Number.isNaN(expiredAtMs)) {
                    clearTimer();
                    return;
                }

                const remaining = Math.max(0, Math.ceil((expiredAtMs - Date.now()) / 1000));
                setRemainingSeconds(remaining);

                if (remaining <= 0) {
                    setIsExpired(true);
                    clearTimer();
                    if (!firedExpireRef.current) {
                        firedExpireRef.current = true;
                        onExpireRef.current?.();
                    }
                } else {
                    clearTimer();
                    intervalRef.current = setInterval(sync, 1000);
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            clearTimer();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [expiredAt]);

    return { remainingSeconds, totalSeconds, isExpired };
};

export default usePerProblemTimer;
