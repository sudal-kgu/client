import { Clouds, Sky } from '@react-three/drei';

import IslandMesh from './environments/IslandMesh';
import Ocean from './environments/Ocean';

export const Scene = () => {
    return (
        <>
            <color attach="background" args={['#87ceeb']} />
            <fog attach="fog" args={['#87ceeb', 1, 350]} />
            <directionalLight
                position={[25, 35, 20]}
                intensity={1.1}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-left={-22}
                shadow-camera-right={22}
                shadow-camera-top={22}
                shadow-camera-bottom={-22}
                shadow-camera-near={0.5}
                shadow-camera-far={120}
            />
            <hemisphereLight args={[0x87ceeb, 0x556b2f, 0.35]} />
            <Sky sunPosition={[100, 20, 100]} turbidity={6} rayleigh={0.5} />
            <Ocean />
            <Clouds />
            <IslandMesh />
        </>
    );
};
