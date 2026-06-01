import { useMemo } from 'react';

import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

import { KTX2Utils } from '../../../../../utils/ktx2-utils';
import { TreeUtils } from '../../../../../utils/tree-utils';
import type { ITreePosition } from '../../config/types';

TreeUtils.preload();

interface Props {
    position: ITreePosition;
}

const Tree = ({ position }: Props) => {
    const { scene } = useGLTF(
        TreeUtils.getModelPath(position.id),
        undefined,
        undefined,
        KTX2Utils.extendLoader,
    );
    const [cloned, yOffset] = useMemo(() => {
        const clonedScene = scene.clone(true);
        const box = new THREE.Box3().setFromObject(clonedScene);
        return [clonedScene, -box.min.y];
    }, [scene]);
    const rotY = TreeUtils.getRotationY(position.id);

    return (
        <primitive
            object={cloned}
            position={[position.pos[0], position.pos[1] + yOffset, position.pos[2]]}
            rotation={[0, rotY, 0]}
            scale={1.25}
        />
    );
};

export default Tree;
