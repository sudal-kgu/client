import { useMemo } from 'react';

import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

import { TreeUtils } from '../../../../../utils/tree-utils';
import type { ITreePosition } from '../../config/types';

interface Props {
    position: ITreePosition;
}

TreeUtils.preload();

const Tree = ({ position }: Props) => {
    const { scene } = useGLTF(TreeUtils.getModelPath(position.id));
    const [cloned, yOffset] = useMemo(() => {
        const clonedScene = scene.clone(true);
        const box = new THREE.Box3().setFromObject(clonedScene);
        return [clonedScene, -box.min.y];
    }, [scene]);
    const rotY = (TreeUtils.hashId(position.id + 'r') % 628) / 100;

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
