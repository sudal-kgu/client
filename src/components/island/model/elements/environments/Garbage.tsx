import type { IGarbagePosition } from '../../config/types';

const RADIUS: Record<string, number> = {
    small: 0.3,
    medium: 0.4,
    large: 0.6,
};

const COLOR: Record<string, string> = {
    small: '#959595',
    medium: '#a0a0a0',
    large: '#888888',
};

interface Props {
    postion: IGarbagePosition;
}

const Garbage = ({ postion }: Props) => (
    <mesh position={postion.pos} castShadow>
        <sphereGeometry args={[RADIUS[postion.type], 7, 7]} />
        <meshLambertMaterial color={COLOR[postion.type]} />
    </mesh>
);

export default Garbage;
