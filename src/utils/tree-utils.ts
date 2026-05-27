import { useGLTF } from '@react-three/drei';

export class TreeUtils {
    static readonly MODELS = [
        '/game/model/tree/tree_1.glb',
        '/game/model/tree/tree_2.glb',
    ] as const;

    static preload() {
        TreeUtils.MODELS.forEach((p) => useGLTF.preload(p));
    }

    static hashId(id: string): number {
        let h = 0;
        for (let i = 0; i < id.length; i++)
            h = (((h << 5) - h + id.charCodeAt(i)) >>> 0) & 0x7fffffff;
        return h;
    }

    static getModelPath(id: string): string {
        return TreeUtils.MODELS[TreeUtils.hashId(id) % TreeUtils.MODELS.length];
    }
}
