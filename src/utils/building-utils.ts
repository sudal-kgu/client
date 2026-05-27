import { useGLTF } from '@react-three/drei';

export class BuildingUtils {
    private static readonly BASE_PATH = '/game/model/building';

    static readonly MODELS = [
        'model_clothes_01',
        'model_plastic_01',
        'model_purity_01',
        'model_recycle_01',
        'model_waste_01',
        'model_wind_01',
    ] as const;

    static getModelPath(model: string): string {
        return `${BuildingUtils.BASE_PATH}/${model}.glb`;
    }

    static preload() {
        BuildingUtils.MODELS.forEach((m) => useGLTF.preload(BuildingUtils.getModelPath(m)));
    }
}
