import type React from 'react';

import type { IBuilding } from '../../../../../api/types';
import { BuildingType } from '../../../../../api/types';

const ProductionBuilding = () => (
    <group>
        <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.2, 1.1, 1.2]} />
            <meshLambertMaterial color="#8B7355" />
        </mesh>
        <mesh position={[0, 1.12, 0]} castShadow>
            <boxGeometry args={[1.32, 0.08, 1.32]} />
            <meshLambertMaterial color="#6b5340" />
        </mesh>
        <mesh position={[0.3, 1.72, 0.28]} castShadow>
            <cylinderGeometry args={[0.1, 0.13, 1.1, 8]} />
            <meshLambertMaterial color="#555555" />
        </mesh>
        <mesh position={[-0.28, 1.52, -0.24]} castShadow>
            <cylinderGeometry args={[0.08, 0.1, 0.7, 8]} />
            <meshLambertMaterial color="#555555" />
        </mesh>
        <mesh position={[0, 0.58, 0.61]}>
            <boxGeometry args={[0.32, 0.32, 0.02]} />
            <meshLambertMaterial color="#a0c8e0" />
        </mesh>
    </group>
);

const PurificationBuilding = () => (
    <group>
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.92, 0.98, 0.4, 16]} />
            <meshLambertMaterial color="#4a7898" />
        </mesh>
        <mesh position={[0, 0.68, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.72, 0.92, 0.72, 16]} />
            <meshLambertMaterial color="#3a8ab0" />
        </mesh>
        <mesh position={[0, 1.1, 0]} castShadow>
            <sphereGeometry args={[0.72, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshLambertMaterial color="#30a0c8" />
        </mesh>
        <mesh position={[0.55, 0.82, 0.3]} castShadow>
            <cylinderGeometry args={[0.06, 0.06, 0.65, 8]} />
            <meshLambertMaterial color="#285870" />
        </mesh>
    </group>
);

const BUILDING_MAP: Record<string, () => React.ReactNode> = {
    [BuildingType.PRODUCTION]: ProductionBuilding,
    [BuildingType.PURIFICATION]: PurificationBuilding,
};

interface Props {
    building: IBuilding;
}

const Building = ({ building }: Props) => {
    const Component = BUILDING_MAP[building.category] ?? ProductionBuilding;
    return <Component />;
};

export default Building;
