import { useEffect, useRef } from 'react';

import { useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Water } from 'three/examples/jsm/objects/Water2.js';

const WAVES = [
    { dirX: 1.0, dirZ: 0.0, amplitude: 0.72, wavelength: 48, speed: 0.19, swellFreq: 0.06 },
    { dirX: 0.7, dirZ: 0.7, amplitude: 0.45, wavelength: 30, speed: 0.28, swellFreq: 0.1 },
    { dirX: -0.4, dirZ: 0.9, amplitude: 0.26, wavelength: 20, speed: 0.44, swellFreq: 0.07 },
    { dirX: 0.9, dirZ: -0.4, amplitude: 0.14, wavelength: 11, speed: 1.02, swellFreq: 0.15 },
    { dirX: -0.8, dirZ: -0.6, amplitude: 0.17, wavelength: 34, speed: 0.14, swellFreq: 0.05 },
    { dirX: 0.3, dirZ: -0.95, amplitude: 0.08, wavelength: 9, speed: 1.24, swellFreq: 0.14 },
];

const getWaveHeight = (x: number, z: number, t: number): number => {
    let h = 0;
    for (const w of WAVES) {
        const k = (2 * Math.PI) / w.wavelength;
        const speedMod = 1 + 0.45 * Math.sin(t * w.swellFreq);
        const ampMod = 0.6 + 0.4 * Math.abs(Math.sin(t * w.swellFreq * 1.73 + 1.2));
        h +=
            w.amplitude * ampMod * Math.sin(k * (w.dirX * x + w.dirZ * z) - w.speed * speedMod * t);
    }
    const dist = Math.sqrt(x * x + z * z);
    return h * Math.max(0, 1 - dist / 99);
};

const useOcean = () => {
    const { scene } = useThree();
    const normalMap = useTexture('/game/waternormals.jpg');
    const waterRef = useRef<Water | null>(null);

    useEffect(() => {
        normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;

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
            shader.vertexShader = 'varying float vWaveZ;\n' + shader.vertexShader;
            shader.vertexShader = shader.vertexShader.replace(
                'void main() {',
                'void main() {\n  vWaveZ = position.z;',
            );

            shader.fragmentShader = 'varying float vWaveZ;\n' + shader.fragmentShader;
            const cut = shader.fragmentShader.lastIndexOf('}');
            shader.fragmentShader =
                shader.fragmentShader.slice(0, cut) +
                `
                float t = clamp(vWaveZ * 0.7 + 0.5, 0.0, 1.0);
                vec3 deepColor    = vec3(0.00, 0.21, 0.30);
                vec3 shallowColor = vec3(0.03, 0.51, 0.73);
                gl_FragColor.rgb = mix(gl_FragColor.rgb, mix(deepColor, shallowColor, t), 0.35);
                }`;
        };

        water.rotation.x = -Math.PI / 2;
        scene.add(water);
        waterRef.current = water;

        return () => {
            scene.remove(water);
            geometry.dispose();
            waterRef.current = null;
        };
    }, [scene, normalMap]);

    useFrame(({ clock }) => {
        const water = waterRef.current;
        if (!water) return;

        const t = clock.getElapsedTime();
        const pos = water.geometry.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < pos.count; i++) {
            pos.setZ(i, getWaveHeight(pos.getX(i), pos.getY(i), t));
        }
        pos.needsUpdate = true;
        water.geometry.computeVertexNormals();
    });
};

export default useOcean;
