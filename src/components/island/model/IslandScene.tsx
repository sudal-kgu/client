import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { Scene } from './elements/Scene';

const IslandScene = () => (
    <Canvas
        camera={{ position: [28, 21, 28], fov: 70 }}
        shadows
        gl={{ antialias: true }}
        style={{ width: '100%', height: '100%' }}
    >
        <Scene />
        <OrbitControls
            enablePan={false}
            minPolarAngle={0.25}
            maxPolarAngle={1.35}
            minDistance={25}
            maxDistance={60}
            target={[0, 1, 0]}
            autoRotate
            autoRotateSpeed={0.25}
        />
    </Canvas>
);

export default IslandScene;
