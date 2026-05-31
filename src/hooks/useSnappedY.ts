import { type RefObject, useEffect, useRef, useState } from 'react';

import * as THREE from 'three';

import {
    BUILDING_SLOTS,
    GARBAGE_LARGE_SPAWN_POINTS,
    GARBAGE_SPAWN_POINTS,
    TREE_SPAWN_POINTS,
} from '../components/island/model/config';

const ALL_SPAWN_POINTS = [
    ...BUILDING_SLOTS,
    ...GARBAGE_SPAWN_POINTS,
    ...GARBAGE_LARGE_SPAWN_POINTS,
    ...TREE_SPAWN_POINTS,
];

const RAYCAST_ORIGIN_Y = 50;
const RAYCAST_DIRECTION = new THREE.Vector3(0, -1, 0);
const Y_OFFSET = 0.2;

export const useSnappedY = (
    terrainRef: RefObject<THREE.Object3D | null>,
    groupScale: number,
    deps: unknown[],
) => {
    const raycasterRef = useRef(new THREE.Raycaster());
    const [snappedY, setSnappedY] = useState<Record<string, number>>({});

    useEffect(() => {
        if (!terrainRef.current) return;

        const terrain = terrainRef.current;
        terrain.updateWorldMatrix(true, true);

        const raycaster = raycasterRef.current;

        const snap = (x: number, z: number, fallback: number): number => {
            raycaster.set(
                new THREE.Vector3(x * groupScale, RAYCAST_ORIGIN_Y, z * groupScale),
                RAYCAST_DIRECTION,
            );
            const hits = raycaster.intersectObject(terrain, true);
            return hits.length > 0 ? hits[0].point.y / groupScale + Y_OFFSET : fallback;
        };

        const result: Record<string, number> = {};
        ALL_SPAWN_POINTS.forEach(({ id, pos }) => {
            result[id] = snap(pos[0], pos[2], pos[1]);
        });
        setSnappedY(result);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [terrainRef, groupScale, ...deps]);

    return snappedY;
};
