import { useMemo } from 'react';

import { useGLTF } from '@react-three/drei';

import type { IGarbagePosition } from '../../config/types';

const SMALL_MODELS = Array.from(
    { length: 10 },
    (_, i) => `/game/model/trash/trash_small_${i + 1}.glb`,
);

SMALL_MODELS.forEach((p) => useGLTF.preload(p));

const hashId = (id: string): number => {
    let h = 0;
    for (let i = 0; i < id.length; i++) h = (((h << 5) - h + id.charCodeAt(i)) >>> 0) & 0x7fffffff;
    return h;
};

interface Props {
    postion: IGarbagePosition;
}

const Garbage = ({ postion }: Props) => {
    const modelPath = SMALL_MODELS[hashId(postion.id) % SMALL_MODELS.length];
    const { scene } = useGLTF(modelPath);
    const cloned = useMemo(() => scene.clone(true), [scene]);
    const rotY = (hashId(postion.id + 'r') % 628) / 100;

    return (
        <primitive object={cloned} position={postion.pos} rotation={[0, rotY, 0]} scale={5 / 12} />
    );
};

export default Garbage;
