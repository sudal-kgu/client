import { useEffect, useRef } from 'react';

import { useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Water } from 'three/examples/jsm/objects/Water2.js';

import useIsland from '../api/hooks/useIsland';
import usePurchasedItems from '../api/hooks/usePurchasedItems';
import { OceanUtils, type WaterColorUniforms } from '../utils/ocean-utils';

const useOcean = () => {
    const { scene } = useThree();
    const normalMap = useTexture('/game/waternormals.jpg');
    const waterRef = useRef<Water | null>(null);
    const colorUniformsRef = useRef<WaterColorUniforms | null>(null);

    const { island } = useIsland();
    const { waterQualityRatio } = usePurchasedItems();

    useEffect(() => {
        normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
        normalMap.needsUpdate = true;

        const deepColorUniform = { value: new THREE.Color() };
        const shallowColorUniform = { value: new THREE.Color() };
        colorUniformsRef.current = { deep: deepColorUniform, shallow: shallowColorUniform };

        const geometry = new THREE.PlaneGeometry(300, 300, 80, 80);
        const water = new Water(geometry, {
            textureWidth: 1024,
            textureHeight: 1024,
            normalMap0: normalMap,
            normalMap1: normalMap,
            color: new THREE.Color(0x00608a),
            flowDirection: new THREE.Vector2(1, 0.5),
            flowSpeed: 0.025,
            scale: 6,
            reflectivity: 0.12,
        });

        water.material.onBeforeCompile = (shader) => {
            shader.uniforms.uDeepColor = deepColorUniform;
            shader.uniforms.uShallowColor = shallowColorUniform;

            shader.vertexShader = 'varying float vWaveZ;\n' + shader.vertexShader;
            shader.vertexShader = shader.vertexShader.replace(
                'void main() {',
                'void main() {\n  vWaveZ = position.z;',
            );

            shader.fragmentShader =
                'varying float vWaveZ;\nuniform vec3 uDeepColor;\nuniform vec3 uShallowColor;\n' +
                shader.fragmentShader;
            const cut = shader.fragmentShader.lastIndexOf('}');
            shader.fragmentShader =
                shader.fragmentShader.slice(0, cut) +
                `
                float t = clamp(vWaveZ * 0.7 + 0.5, 0.0, 1.0);
                gl_FragColor.rgb = mix(gl_FragColor.rgb, mix(uDeepColor, uShallowColor, t), 0.35);
                }`;
        };

        water.rotation.x = -Math.PI / 2;
        scene.add(water);
        waterRef.current = water;

        return () => {
            scene.remove(water);
            geometry.dispose();
            waterRef.current = null;
            colorUniformsRef.current = null;
        };
    }, [scene, normalMap]);

    useFrame(({ clock }) => {
        const water = waterRef.current;
        if (!water) return;

        const t = clock.getElapsedTime();
        const pos = water.geometry.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < pos.count; i++) {
            pos.setZ(i, OceanUtils.getWaveHeight(pos.getX(i), pos.getY(i), t));
        }
        pos.needsUpdate = true;
        water.geometry.computeVertexNormals();

        if (colorUniformsRef.current) {
            OceanUtils.applyWaterColors(
                colorUniformsRef.current,
                island?.level ?? 1,
                waterQualityRatio,
            );
        }
    });
};

export default useOcean;
