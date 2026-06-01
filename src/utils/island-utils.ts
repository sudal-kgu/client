import { useGLTF } from '@react-three/drei';

import { KTX2Utils } from './ktx2-utils';

export class IslandUtils {
    private static readonly MODELS = Array.from(
        { length: 7 },
        (_, i) => `/game/model/island/island_${i + 1}.glb`,
    );

    static readonly TARGET_DIAMETER = 28;

    private static preloaded = false;

    static preload() {
        if (this.preloaded) return;
        this.preloaded = true;
        KTX2Utils.registerPreload(() =>
            IslandUtils.MODELS.forEach((p) =>
                useGLTF.preload(p, undefined, undefined, KTX2Utils.extendLoader),
            ),
        );
    }

    static getModelPath(islandLevel: number, soilPurificationLevel: number): string {
        const index =
            islandLevel >= 3 && soilPurificationLevel > 0
                ? 3 + soilPurificationLevel
                : Math.min(islandLevel, 3);
        return IslandUtils.MODELS[index - 1];
    }
}
