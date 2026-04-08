class UriUtils {
    public static makeUriWithSearchParam(
        path: string,
        params: Record<string, string | null>,
    ): string {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([k, v]) => {
            if (!v) return;
            searchParams.append(k, v);
        });
        const queryString = searchParams.toString();
        return queryString ? `${path}?${queryString}` : path;
    }
}

export default UriUtils;
