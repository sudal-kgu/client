import type { GarbageItemConfig } from '../../../types';

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

export const GarbageItem = ({ config }: { config: GarbageItemConfig }) => (
    <mesh position={config.position} castShadow>
        <sphereGeometry args={[RADIUS[config.type], 7, 7]} />
        <meshLambertMaterial color={COLOR[config.type]} />
    </mesh>
);
