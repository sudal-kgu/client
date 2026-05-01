import { useMemo, useRef } from 'react';

import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import type { OceanProps } from '../../../types';
import { waveFragmentShader, waveVertexShader } from '../../shaders/wave';

export const Ocean = ({ color = 0x0077aa, speed = 1.0, height = 0.8 }: OceanProps) => {
    const meshRef = useRef<THREE.Mesh>(null);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uSpeed: { value: speed },
            uHeight: { value: height },
            uWaterColor: { value: new THREE.Color(color) },
            uSunDir: { value: new THREE.Vector3(25, 35, 20).normalize() },
        }),
        [],
    );

    useFrame(({ clock }) => {
        const mat = meshRef.current?.material as THREE.ShaderMaterial | undefined;
        if (!mat) return;
        mat.uniforms.uTime.value = clock.getElapsedTime();
    });

    return (
        <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[300, 300, 128, 128]} />
            <shaderMaterial
                vertexShader={waveVertexShader}
                fragmentShader={waveFragmentShader}
                uniforms={uniforms}
                transparent
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};
