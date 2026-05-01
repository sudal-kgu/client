import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import type { BuildingConfig, GarbageItemConfig } from '../types';
import { Scene } from './elements/Scene';

interface IslandSceneProps {
    level?: number;
    garbageItems?: GarbageItemConfig[];
    buildings?: BuildingConfig[];
}

const IslandScene = ({ level, garbageItems, buildings }: IslandSceneProps) => (
    <Canvas
        camera={{ position: [28, 21, 28], fov: 70 }}
        shadows
        gl={{ antialias: true }}
        style={{ width: '100%', height: '100%' }}
    >
        <Scene level={level} garbageItems={garbageItems} buildings={buildings} />
        <OrbitControls
            enablePan={false}
            minPolarAngle={0.25}
            maxPolarAngle={1.35}
            minDistance={16}
            maxDistance={90}
            target={[0, 1, 0]}
        />
    </Canvas>
);

export default IslandScene;
