import { useGLTF } from '@react-three/drei';

export class GarbageUtils {
    static readonly SMALL_MODELS = Array.from(
        { length: 10 },
        (_, i) => `/game/model/trash/trash_small_${i + 1}.glb`,
    );
    static readonly LARGE_MODEL = '/game/model/trash/trash_large_1.glb';

    static preload() {
        GarbageUtils.SMALL_MODELS.forEach((p) => useGLTF.preload(p));
        useGLTF.preload(GarbageUtils.LARGE_MODEL);
    }

    static hashId(id: string): number {
        let h = 0;
        for (let i = 0; i < id.length; i++)
            h = (((h << 5) - h + id.charCodeAt(i)) >>> 0) & 0x7fffffff;
        return h;
    }
}

GarbageUtils.preload();
