import { useEffect, useRef, useState } from 'react';

const TIMER_SECONDS = 20;

const usePerProblemTimer = (problemIndex: number, expiredAt: string | null) => {
    const problemNumber = problemIndex + 1;

    const alreadyExpired = expiredAt !== null && new Date(expiredAt).getTime() - Date.now() <= 0;

    const [remainingSeconds, setRemainingSeconds] = useState<number>(
        alreadyExpired ? 0 : TIMER_SECONDS,
    );
    const [isExpired, setIsExpired] = useState<boolean>(alreadyExpired);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        console.log(`[Quiz Timer] Problem changed: ${problemNumber}`);

        if (alreadyExpired) {
            console.log(`[Quiz Timer] Problem ${problemNumber} already expired — skip timer`);
            setIsExpired(true);
            setRemainingSeconds(0);
            return;
        }

        setRemainingSeconds(TIMER_SECONDS);
        setIsExpired(false);

        console.log(`[Quiz Timer] Timer force-reset to ${TIMER_SECONDS} seconds`);
        console.log(`[Quiz Timer] UI shows ${TIMER_SECONDS} seconds for problem ${problemNumber}`);

        let current = TIMER_SECONDS;
        intervalRef.current = setInterval(() => {
            current -= 1;
            const safe = Math.max(0, current);
            setRemainingSeconds(safe);
            if (current <= 0 && intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }, 1000);

        timeoutRef.current = setTimeout(() => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            setIsExpired(true);
            setRemainingSeconds(0);
            console.log(`[Quiz Timer] Problem ${problemNumber} — TIME EXPIRED`);
        }, TIMER_SECONDS * 1000);

        console.log(`[Quiz Timer] Countdown started from ${TIMER_SECONDS}`);

        return () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            console.log(`[Quiz Timer] Previous timer cleaned up (problem ${problemNumber})`);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { remainingSeconds, isExpired };
};

export default usePerProblemTimer;
