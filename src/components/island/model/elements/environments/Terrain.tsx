import { useMemo } from 'react';

import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

import useIsland from '../../../../../api/hooks/useIsland';
import usePurchasedItems from '../../../../../api/hooks/usePurchasedItems';
import { IslandUtils } from '../../../../../utils/island-utils';

IslandUtils.preload();

const Terrain = () => {
    const { island } = useIsland();
    const { soilPurificationLevel } = usePurchasedItems();

    const modelPath = IslandUtils.getModelPath(island?.level ?? 1, soilPurificationLevel);
    const { scene } = useGLTF(modelPath);

    const [cloned, scale] = useMemo(() => {
        const clonedScene = scene.clone(true);
        const box = new THREE.Box3().setFromObject(clonedScene);
        const size = box.getSize(new THREE.Vector3());
        const maxHorizontal = Math.max(size.x, size.z);
        const autoScale = maxHorizontal > 0 ? IslandUtils.TARGET_DIAMETER / maxHorizontal : 1;
        return [clonedScene, autoScale];
    }, [scene]);

    return <primitive object={cloned} scale={scale} castShadow receiveShadow />;
};

export default Terrain;
