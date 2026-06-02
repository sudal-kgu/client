import { useMemo } from 'react';

import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

import type { IBuilding } from '../../../../../api/types';
import { KTX2Utils } from '../../../../../utils/ktx2-utils';

interface Props {
    building: IBuilding;
}

const Building = ({ building }: Props) => {
    const { scene } = useGLTF(building.modelUri, undefined, undefined, KTX2Utils.extendLoader);
    const [cloned, yOffset] = useMemo(() => {
        const clonedScene = scene.clone(true);
        clonedScene.traverse((obj) => {
            if (obj instanceof THREE.Mesh) {
                obj.castShadow = true;
                obj.receiveShadow = true;
            }
        });
        const box = new THREE.Box3().setFromObject(clonedScene);
        return [clonedScene, -box.min.y];
    }, [scene]);
    return <primitive object={cloned} position={[0, yOffset, 0]} />;
};

export default Building;
