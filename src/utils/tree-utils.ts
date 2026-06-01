import { useGLTF } from '@react-three/drei';

import { KTX2Utils } from './ktx2-utils';

export class TreeUtils {
    private static readonly MODELS = [
        '/game/model/tree/tree_1.glb',
        '/game/model/tree/tree_2.glb',
    ] as const;

    private static preloaded = false;

    static preload() {
        if (this.preloaded) return;
        this.preloaded = true;
        KTX2Utils.registerPreload(() =>
            TreeUtils.MODELS.forEach((p) =>
                useGLTF.preload(p, undefined, undefined, KTX2Utils.extendLoader),
            ),
        );
    }

    static getModelPath(id: string): string {
        return TreeUtils.MODELS[this.hashId(id) % TreeUtils.MODELS.length];
    }

    static getRotationY(id: string): number {
        return (this.hashId(id + 'r') % 628) / 100;
    }

    private static hashId(id: string): number {
        let h = 0;
        for (let i = 0; i < id.length; i++)
            h = (((h << 5) - h + id.charCodeAt(i)) >>> 0) & 0x7fffffff;
        return h;
    }
}
