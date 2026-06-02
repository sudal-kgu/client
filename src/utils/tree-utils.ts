import { useGLTF } from '@react-three/drei';

import { KTX2Utils } from './ktx2-utils';

export class TreeUtils {
    private static readonly preloaded = new Set<string>();

    static preload(models: string[]) {
        const fresh = models.filter((m) => !this.preloaded.has(m));
        if (fresh.length === 0) return;
        fresh.forEach((m) => this.preloaded.add(m));
        KTX2Utils.registerPreload(() =>
            fresh.forEach((p) => useGLTF.preload(p, undefined, undefined, KTX2Utils.extendLoader)),
        );
    }

    static getModelPath(id: string, models: string[]): string {
        if (models.length === 0) return '';
        return models[this.hashId(id) % models.length];
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
