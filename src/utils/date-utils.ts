class DateUtils {
    public static getRemainingSeconds(expiredAt: string): number {
        return Math.max(0, Math.floor((new Date(expiredAt).getTime() - Date.now()) / 1000));
    }

    public static formatRemaining(seconds: number): string {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        if (h > 0)
            return `${h}시간 ${String(m).padStart(2, '0')}분 ${String(s).padStart(2, '0')}초`;
        if (m > 0) return `${m}분 ${String(s).padStart(2, '0')}초`;
        return `${s}초`;
    }
}

export default DateUtils;
