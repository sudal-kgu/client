import { useEffect, useRef } from 'react';

import * as THREE from 'three';

import useIsland from '../../../../../api/hooks/useIsland';
import usePurchasedItems from '../../../../../api/hooks/usePurchasedItems';
import useSlot from '../../../../../api/hooks/useSlot';
import useSceneReady from '../../../../../hooks/store/useSceneReady';
import { useSnappedY } from '../../../../../hooks/useSnappedY';
import { GarbageUtils } from '../../../../../utils/garbage-utils';
import { TreeUtils } from '../../../../../utils/tree-utils';
import { BUILDING_SLOTS } from '../../config';
import Clouds from './Clouds';
import Garbage from './Garbage';
import Slot from './Slot';
import Terrain from './Terrain';
import Tree from './Tree';

const GROUP_SCALE = 1.5;

const IslandMesh = () => {
    const { island, isLoading: islandLoading } = useIsland();
    const { slots, maxActivatableSlots, isLoading: slotsLoading } = useSlot();
    const {
        visibleGarbage,
        visibleSeaGarbage,
        visibleTrees,
        soilPurificationLevel,
        smallGarbageModels,
        largeGarbageModels,
        treeModels,
        isLoading: itemsLoading,
    } = usePurchasedItems();
    const { setReady, reset } = useSceneReady();

    const terrainRef = useRef<THREE.Object3D | null>(null);

    const allReady = !islandLoading && !slotsLoading && !itemsLoading && island != null;

    useEffect(() => {
        GarbageUtils.preload(smallGarbageModels, largeGarbageModels);
        TreeUtils.preload(treeModels);
    }, [smallGarbageModels, largeGarbageModels, treeModels]);

    useEffect(() => {
        if (!allReady) return;
        setReady();
        return reset;
    }, [allReady, setReady, reset]);

    const snappedY = useSnappedY(terrainRef, GROUP_SCALE, [
        allReady,
        island?.level,
        soilPurificationLevel,
    ]);

    if (!allReady) return null;

    const canActivate = slots.filter((s) => s.activated).length < maxActivatableSlots;

    return (
        <group scale={1.5}>
            <Terrain ref={terrainRef} />
            <Clouds />
            {(smallGarbageModels.length > 0 || largeGarbageModels.length > 0) &&
                visibleGarbage.map((p) => (
                    <Garbage
                        key={p.id}
                        postion={{ ...p, pos: [p.pos[0], snappedY[p.id] ?? p.pos[1], p.pos[2]] }}
                        smallModels={smallGarbageModels}
                        largeModels={largeGarbageModels}
                    />
                ))}
            {(smallGarbageModels.length > 0 || largeGarbageModels.length > 0) &&
                visibleSeaGarbage.map((position) => (
                    <Garbage
                        key={position.id}
                        postion={position}
                        animated
                        smallModels={smallGarbageModels}
                        largeModels={largeGarbageModels}
                    />
                ))}
            {treeModels.length > 0 &&
                visibleTrees.map((p) => (
                    <Tree
                        key={p.id}
                        position={{ ...p, pos: [p.pos[0], snappedY[p.id] ?? p.pos[1], p.pos[2]] }}
                        models={treeModels}
                    />
                ))}
            {slots.map((slot, index) => {
                const bp = BUILDING_SLOTS[index];
                return (
                    <Slot
                        key={index}
                        position={{
                            ...bp,
                            pos: [bp.pos[0], snappedY[bp.id] ?? bp.pos[1], bp.pos[2]],
                        }}
                        slot={slot}
                        canActivate={canActivate}
                    />
                );
            })}
        </group>
    );
};

export default IslandMesh;
