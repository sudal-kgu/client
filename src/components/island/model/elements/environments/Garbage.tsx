import { useMemo, useRef } from 'react';

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { GarbageUtils } from '../../../../../utils/garbage-utils';
import { KTX2Utils } from '../../../../../utils/ktx2-utils';
import { OceanUtils } from '../../../../../utils/ocean-utils';
import type { IGarbagePosition } from '../../config/types';

const ISLAND_MESH_SCALE = 1.5;

interface Props {
    postion: IGarbagePosition;
    animated?: boolean;
    smallModels: string[];
    largeModels: string[];
}

const Garbage = ({ postion, animated = false, smallModels, largeModels }: Props) => {
    const modelPath = GarbageUtils.getModelPath(postion, smallModels, largeModels);
    const { scene } = useGLTF(modelPath, undefined, undefined, KTX2Utils.extendLoader);
    const cloned = useMemo(() => {
        const clonedScene = scene.clone(true);
        clonedScene.traverse((obj) => {
            if (obj instanceof THREE.Mesh) {
                obj.castShadow = true;
                obj.receiveShadow = true;
            }
        });
        return clonedScene;
    }, [scene]);
    const rotY = GarbageUtils.getRotationY(postion.id);
    const scale = GarbageUtils.getScale(postion.type);
    const groupRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (!animated || !groupRef.current) return;
        const [lx, , lz] = postion.pos;
        const t = clock.getElapsedTime();
        groupRef.current.position.y =
            OceanUtils.getWaveHeight(lx * ISLAND_MESH_SCALE, -lz * ISLAND_MESH_SCALE, t) /
            ISLAND_MESH_SCALE;
    });

    return (
        <group ref={groupRef} position={postion.pos}>
            <primitive object={cloned} rotation={[0, rotY, 0]} scale={scale} />
        </group>
    );
};

export default Garbage;
