import { useGLTF } from '@react-three/drei';

import { GarbageType, type IGarbagePosition } from '../components/island/model/config/types';
import { KTX2Utils } from './ktx2-utils';

export class GarbageUtils {
    private static readonly preloaded = new Set<string>();

    static preload(smallModels: string[], largeModels: string[]) {
        const fresh = [...smallModels, ...largeModels].filter((m) => !this.preloaded.has(m));
        if (fresh.length === 0) return;
        fresh.forEach((m) => this.preloaded.add(m));
        KTX2Utils.registerPreload(() =>
            fresh.forEach((p) => useGLTF.preload(p, undefined, undefined, KTX2Utils.extendLoader)),
        );
    }

    static getModelPath(
        position: IGarbagePosition,
        smallModels: string[],
        largeModels: string[],
    ): string {
        const models = position.type === GarbageType.LARGE ? largeModels : smallModels;
        if (models.length === 0) return '';
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
