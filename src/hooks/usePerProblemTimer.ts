import { useEffect, useRef, useState } from 'react';

const TIMER_SECONDS = 20;

const usePerProblemTimer = (
    problemIndex: number,
    initialSeconds: number | null,
    forceExpired: boolean = false,
) => {
    const problemNumber = problemIndex + 1;

    const startSecondsRef = useRef<number | null>(null);
    if (startSecondsRef.current === null) {
        if (forceExpired) {
            startSecondsRef.current = 0;
        } else if (initialSeconds !== null) {
            startSecondsRef.current = Math.max(0, initialSeconds);
        } else {
            startSecondsRef.current = TIMER_SECONDS;
        }
    }
    const startSeconds = startSecondsRef.current;

    const [remainingSeconds, setRemainingSeconds] = useState<number>(startSeconds);
    const [isExpired, setIsExpired] = useState<boolean>(startSeconds <= 0);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (startSeconds <= 0) {
            console.log(`[Quiz Timer] Problem ${problemNumber} already expired — skip timer`);
            setIsExpired(true);
            setRemainingSeconds(0);
            return;
        }

        setRemainingSeconds(startSeconds);
        setIsExpired(false);

        if (initialSeconds !== null) {
            console.log(`[Quiz Resume] Countdown resumed from ${startSeconds}`);
        } else {
            console.log(`[Quiz Resume] Fresh problem entry detected, using normal 20s start`);
        }

        let current = startSeconds;
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
        }, startSeconds * 1000);

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
