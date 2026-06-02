import { Sky } from '@react-three/drei';

import useOcean from '../../../../hooks/useOcean';
import IslandMesh from './environments/IslandMesh';

export const Scene = () => {
    useOcean();
    return (
        <>
            <color attach="background" args={['#b8dff7']} />
            <fog attach="fog" args={['#c9e8f8', 1, 350]} />
            <directionalLight
                position={[30, 40, 20]}
                intensity={1.4}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-left={-30}
                shadow-camera-right={30}
                shadow-camera-top={30}
                shadow-camera-bottom={-30}
                shadow-camera-near={0.5}
                shadow-camera-far={120}
                shadow-bias={-0.0005}
            />
            <hemisphereLight args={[0xb8dff7, 0x4a7c3f, 0.5]} />
            <Sky
                sunPosition={[80, 25, 60]}
                turbidity={3}
                rayleigh={0.3}
                mieCoefficient={0.003}
                mieDirectionalG={0.9}
            />
            <IslandMesh />
        </>
    );
};
