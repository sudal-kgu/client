import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';

import LoadingScreen from '../LoadingScreen';
import { Scene } from './elements/Scene';

const IslandScene = () => (
    <Wrapper>
        <Canvas
            camera={{ position: [42, 32, 42], fov: 70 }}
            shadows
            gl={{ antialias: true, toneMappingExposure: 2.8 }}
            style={{ width: '100%', height: '100%' }}
        >
            <Scene />
            <OrbitControls
                enablePan={false}
                minPolarAngle={0.25}
                maxPolarAngle={1.35}
                minDistance={30}
                maxDistance={55}
                target={[0, 2, 0]}
                autoRotate
                autoRotateSpeed={0.25}
            />
        </Canvas>
        <LoadingScreen />
    </Wrapper>
);

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

export default IslandScene;
