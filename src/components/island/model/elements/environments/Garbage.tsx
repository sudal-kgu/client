import { useMemo, useRef } from 'react';

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { GarbageUtils } from '../../../../../utils/garbage-utils';
import { OceanUtils } from '../../../../../utils/ocean-utils';
import { GarbageType, type IGarbagePosition } from '../../config/types';

interface Props {
    postion: IGarbagePosition;
    animated?: boolean;
}

GarbageUtils.preload();

// must match the scale of the <group> in IslandMesh
const ISLAND_MESH_SCALE = 1.5;

const Garbage = ({ postion, animated = false }: Props) => {
    const modelPath =
        postion.type === GarbageType.LARGE
            ? GarbageUtils.LARGE_MODEL[
                  GarbageUtils.hashId(postion.id) % GarbageUtils.LARGE_MODEL.length
              ]
            : GarbageUtils.SMALL_MODELS[
                  GarbageUtils.hashId(postion.id) % GarbageUtils.SMALL_MODELS.length
              ];
    const { scene } = useGLTF(modelPath);
    const cloned = useMemo(() => scene.clone(true), [scene]);
    const rotY = (GarbageUtils.hashId(postion.id + 'r') % 628) / 100;
    const groupRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (!animated || !groupRef.current) return;
        const t = clock.getElapsedTime();
        const [lx, , lz] = postion.pos;
        // local → world for wave sampling (PlaneGeometry rotated -π/2: y_local = -z_world)
        // result back to local by dividing by scale
        const waveY =
            OceanUtils.getWaveHeight(lx * ISLAND_MESH_SCALE, -lz * ISLAND_MESH_SCALE, t) /
            ISLAND_MESH_SCALE;
        groupRef.current.position.y = waveY;
    });

    return (
        <group ref={groupRef} position={postion.pos}>
            <primitive
                object={cloned}
                rotation={[0, rotY, 0]}
                scale={postion.type === GarbageType.LARGE ? 1 / 2 : 1 / 3}
            />
        </group>
    );
};

export default Garbage;
