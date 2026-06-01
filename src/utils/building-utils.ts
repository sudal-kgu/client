import { useGLTF } from '@react-three/drei';

import { KTX2Utils } from './ktx2-utils';

export class BuildingUtils {
    private static readonly BASE_PATH = '/game/model/building';

    private static readonly MODELS = [
        'model_clothes_01',
        'model_plastic_01',
        'model_purity_01',
        'model_recycle_01',
        'model_waste_01',
        'model_wind_01',
    ] as const;

    private static preloaded = false;

    static preload() {
        if (this.preloaded) return;
        this.preloaded = true;
        KTX2Utils.registerPreload(() =>
            BuildingUtils.MODELS.forEach((m) =>
                useGLTF.preload(
                    BuildingUtils.getModelPath(m),
                    undefined,
                    undefined,
                    KTX2Utils.extendLoader,
                ),
            ),
        );
    }

    static getModelPath(model: string): string {
        return `${BuildingUtils.BASE_PATH}/${model}.glb`;
    }
}
