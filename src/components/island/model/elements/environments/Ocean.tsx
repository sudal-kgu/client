import { useMemo, useRef } from 'react';

import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { waveFragmentShader, waveVertexShader } from '../../shaders/wave';

const Ocean = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uSpeed: { value: 1.0 },
            uHeight: { value: 0.8 },
            uWaterColor: { value: new THREE.Color(0x0077aa) },
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

export default Ocean;
