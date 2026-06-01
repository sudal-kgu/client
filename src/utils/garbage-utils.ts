import { useGLTF } from '@react-three/drei';

import { GarbageType, type IGarbagePosition } from '../components/island/model/config/types';
import { KTX2Utils } from './ktx2-utils';

export class GarbageUtils {
    private static readonly SMALL_MODELS = Array.from(
        { length: 10 },
        (_, i) => `/game/model/trash/trash_small_${i + 1}.glb`,
    );

    private static readonly LARGE_MODELS = Array.from(
        { length: 3 },
        (_, i) => `/game/model/trash/trash_large_${i + 1}.glb`,
    );

    private static preloaded = false;

    static preload() {
        if (this.preloaded) return;
        this.preloaded = true;
        KTX2Utils.registerPreload(() => {
            this.SMALL_MODELS.forEach((p) =>
                useGLTF.preload(p, undefined, undefined, KTX2Utils.extendLoader),
            );
            this.LARGE_MODELS.forEach((p) =>
                useGLTF.preload(p, undefined, undefined, KTX2Utils.extendLoader),
            );
        });
    }

    static getModelPath(position: IGarbagePosition): string {
        const models = position.type === GarbageType.LARGE ? this.LARGE_MODELS : this.SMALL_MODELS;
        return models[this.hashId(position.id) % models.length];
    }

    static getRotationY(id: string): number {
        return (this.hashId(id + 'r') % 628) / 100;
    }

    static getScale(type: GarbageType): number {
        return type === GarbageType.LARGE ? 1 / 2 : 1 / 3;
    }

    private static hashId(id: string): number {
        let h = 0;
        for (let i = 0; i < id.length; i++)
            h = (((h << 5) - h + id.charCodeAt(i)) >>> 0) & 0x7fffffff;
        return h;
    }
}
