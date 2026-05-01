import type { TreeProps } from '../../../types';

export const Tree = ({ position }: TreeProps) => (
    <group position={position}>
        <mesh position={[0, 0.45, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.14, 0.9, 7]} />
            <meshLambertMaterial color="#7a5230" />
        </mesh>
        <mesh position={[0, 1.45, 0]} castShadow>
            <coneGeometry args={[0.75, 1.3, 8]} />
            <meshLambertMaterial color="#2e7d32" />
        </mesh>
    </group>
);
