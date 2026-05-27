import { useMemo } from 'react';

import { useGLTF } from '@react-three/drei';

import { GarbageUtils } from '../../../../../utils/garbage-utils';
import { GarbageType, type IGarbagePosition } from '../../config/types';

interface Props {
    postion: IGarbagePosition;
}

GarbageUtils.preload();

const Garbage = ({ postion }: Props) => {
    const modelPath =
        postion.type === GarbageType.LARGE
            ? GarbageUtils.LARGE_MODEL
            : GarbageUtils.SMALL_MODELS[
                  GarbageUtils.hashId(postion.id) % GarbageUtils.SMALL_MODELS.length
              ];
    const { scene } = useGLTF(modelPath);
    const cloned = useMemo(() => scene.clone(true), [scene]);
    const rotY = (GarbageUtils.hashId(postion.id + 'r') % 628) / 100;

    return (
        <primitive
            object={cloned}
            position={postion.pos}
            rotation={[0, rotY, 0]}
            scale={postion.type === GarbageType.LARGE ? 3 / 4 : 5 / 12}
        />
    );
};

export default Garbage;
