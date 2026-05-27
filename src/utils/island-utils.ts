import { useGLTF } from '@react-three/drei';

export class IslandUtils {
    private static readonly MODELS = Array.from(
        { length: 7 },
        (_, i) => `/game/model/island/island_${i + 1}.glb`,
    );

    public static readonly TARGET_DIAMETER = 28;

    public static preload() {
        IslandUtils.MODELS.forEach((p) => useGLTF.preload(p));
    }

    public static getModelPath(islandLevel: number, soilPurificationLevel: number): string {
        const index =
            islandLevel >= 3 && soilPurificationLevel > 0
                ? 3 + soilPurificationLevel
                : Math.min(islandLevel, 3);
        return IslandUtils.MODELS[index - 1];
    }
}
