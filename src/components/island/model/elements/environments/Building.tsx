import type { BuildingConfig } from '../../../types';

export const Building = ({ config }: { config: BuildingConfig }) => (
    <group position={config.position} rotation={[0, config.rotationY ?? 0, 0]}>
        <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.5, 1.5, 1.5]} />
            <meshLambertMaterial color="#b0b0b0" />
        </mesh>
    </group>
);
