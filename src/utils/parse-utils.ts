import type { Schema } from 'zod/v3';

class ParseUtils {
    public static safeParse<T>(schema: Schema<T>, data: unknown): T {
        try {
            const json = typeof data === 'string' ? JSON.parse(data) : data;
            return schema.parse(json);
        } catch (error) {
            console.log('Parse Error: ', error);
            throw error;
        }
    }
}

export default ParseUtils;
