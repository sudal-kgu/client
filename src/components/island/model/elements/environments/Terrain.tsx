import { forwardRef, useMemo } from 'react';

import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

import useIsland from '../../../../../api/hooks/useIsland';
import usePurchasedItems from '../../../../../api/hooks/usePurchasedItems';
import { IslandUtils } from '../../../../../utils/island-utils';
import { KTX2Utils } from '../../../../../utils/ktx2-utils';

IslandUtils.preload();

const Terrain = forwardRef<THREE.Object3D>((_, ref) => {
    const { island } = useIsland();
    const { soilPurificationLevel } = usePurchasedItems();

    const modelPath = IslandUtils.getModelPath(island?.level ?? 1, soilPurificationLevel);
    const { scene } = useGLTF(modelPath, undefined, undefined, KTX2Utils.extendLoader);

    const { cloned, scale } = useMemo(() => {
        const clonedScene = scene.clone(true);
        const box = new THREE.Box3().setFromObject(clonedScene);
        const size = box.getSize(new THREE.Vector3());
        const maxHorizontal = Math.max(size.x, size.z);
        return {
            cloned: clonedScene,
            scale: maxHorizontal > 0 ? IslandUtils.TARGET_DIAMETER / maxHorizontal : 1,
        };
    }, [scene]);

    return <primitive ref={ref} object={cloned} scale={scale} castShadow receiveShadow />;
});

Terrain.displayName = 'Terrain';

export default Terrain;
