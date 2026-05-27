import * as THREE from 'three';

export type WaterColorUniforms = {
    deep: { value: THREE.Color };
    shallow: { value: THREE.Color };
};

export class OceanUtils {
    public static readonly WATER_COLORS = {
        level1: { deep: new THREE.Color('#1e3d20'), shallow: new THREE.Color('#3d7040') },
        level2: { deep: new THREE.Color('#0e2e3a'), shallow: new THREE.Color('#1e5a6e') },
        level3: { deep: new THREE.Color('#003550'), shallow: new THREE.Color('#0d82b4') },
        clean: { deep: new THREE.Color('#00406a'), shallow: new THREE.Color('#00c4e8') },
    } as const;

    public static readonly WAVES = [
        { dirX: 1.0, dirZ: 0.0, amplitude: 0.6, wavelength: 48, speed: 0.19, swellFreq: 0.06 },
        { dirX: 0.7, dirZ: 0.7, amplitude: 0.38, wavelength: 30, speed: 0.28, swellFreq: 0.1 },
        { dirX: -0.4, dirZ: 0.9, amplitude: 0.22, wavelength: 20, speed: 0.44, swellFreq: 0.07 },
        { dirX: 0.9, dirZ: -0.4, amplitude: 0.1, wavelength: 11, speed: 1.02, swellFreq: 0.15 },
        { dirX: -0.8, dirZ: -0.6, amplitude: 0.14, wavelength: 34, speed: 0.14, swellFreq: 0.05 },
        { dirX: 0.3, dirZ: -0.95, amplitude: 0.05, wavelength: 9, speed: 1.24, swellFreq: 0.14 },
    ];

    public static applyWaterColors(
        uniforms: WaterColorUniforms,
        islandLevel: number,
        waterQualityRatio: number,
    ): void {
        const { WATER_COLORS } = OceanUtils;
        const base =
            islandLevel <= 1
                ? WATER_COLORS.level1
                : islandLevel === 2
                  ? WATER_COLORS.level2
                  : WATER_COLORS.level3;
        const next =
            islandLevel <= 1
                ? WATER_COLORS.level2
                : islandLevel === 2
                  ? WATER_COLORS.level3
                  : WATER_COLORS.clean;

        uniforms.deep.value.copy(base.deep).lerp(next.deep, waterQualityRatio);
        uniforms.shallow.value.copy(base.shallow).lerp(next.shallow, waterQualityRatio);
    }

    public static getWaveHeight(x: number, z: number, t: number): number {
        let h = 0;
        for (const w of OceanUtils.WAVES) {
            const k = (2 * Math.PI) / w.wavelength;
            const speedMod = 1 + 0.41 * Math.sin(t * w.swellFreq);
            const ampMod = 0.64 + 0.36 * Math.abs(Math.sin(t * w.swellFreq * 1.73 + 1.2));
            h +=
                w.amplitude *
                ampMod *
                Math.sin(k * (w.dirX * x + w.dirZ * z) - w.speed * speedMod * t);
        }
        const dist = Math.sqrt(x * x + z * z);
        return h * Math.max(0, 1 - dist / 99);
    }
}
