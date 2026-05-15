import { Cloud, Clouds as DreiClouds } from '@react-three/drei';
import * as THREE from 'three';

import { DEFAULT_CLOUDS } from '../../config';

const Clouds = () => (
    <DreiClouds material={THREE.MeshLambertMaterial}>
        {DEFAULT_CLOUDS.map((c, i) => (
            <Cloud
                key={i}
                seed={i}
                position={c.position}
                segments={c.segments}
                bounds={c.bounds}
                volume={c.volume}
                color={c.color}
                speed={c.speed}
            />
        ))}
    </DreiClouds>
);

export default Clouds;
