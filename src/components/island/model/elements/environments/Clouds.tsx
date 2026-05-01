import { Cloud, Clouds as DreiClouds } from '@react-three/drei';
import * as THREE from 'three';

import type { CloudConfig, CloudsProps } from '../../../types';

const DEFAULT_CLOUDS: CloudConfig[] = [
    { position: [-15, 18, -8], segments: 50, bounds: [14, 3, 3], volume: 12, speed: 0.3 },
    { position: [8, 20, 5], segments: 50, bounds: [12, 3, 3], volume: 10, speed: 0.2 },
    { position: [18, 16, -12], segments: 45, bounds: [16, 3, 3], volume: 14, speed: 0.4 },
    { position: [-5, 17, 14], segments: 45, bounds: [13, 3, 3], volume: 11, speed: 0.25 },
    { position: [22, 19, 8], segments: 40, bounds: [12, 2, 2], volume: 9, speed: 0.35 },
    { position: [-20, 15, 3], segments: 50, bounds: [15, 3, 3], volume: 13, speed: 0.2 },
    { position: [35, 22, -20], segments: 40, bounds: [18, 3, 3], volume: 15, speed: 0.15 },
    { position: [-35, 20, 10], segments: 40, bounds: [16, 3, 3], volume: 13, speed: 0.28 },
    { position: [10, 24, -35], segments: 35, bounds: [20, 3, 3], volume: 16, speed: 0.18 },
    { position: [-10, 21, 35], segments: 35, bounds: [18, 3, 3], volume: 14, speed: 0.22 },
    { position: [45, 18, 15], segments: 30, bounds: [20, 2, 2], volume: 12, speed: 0.12 },
    { position: [-45, 19, -15], segments: 30, bounds: [22, 2, 2], volume: 14, speed: 0.16 },
    { position: [60, 25, -40], segments: 25, bounds: [24, 2, 2], volume: 10, speed: 0.08 },
    { position: [-60, 23, 30], segments: 25, bounds: [22, 2, 2], volume: 9, speed: 0.1 },
    { position: [30, 26, -60], segments: 25, bounds: [20, 2, 2], volume: 11, speed: 0.09 },
    { position: [-30, 22, 60], segments: 25, bounds: [24, 2, 2], volume: 10, speed: 0.11 },
];

export const Clouds = ({ clouds = DEFAULT_CLOUDS }: CloudsProps) => (
    <DreiClouds material={THREE.MeshLambertMaterial}>
        {clouds.map((c, i) => (
            <Cloud
                key={i}
                position={c.position}
                segments={c.segments ?? 40}
                bounds={c.bounds ?? [10, 2, 2]}
                volume={c.volume ?? 10}
                color={c.color ?? 'white'}
                speed={c.speed ?? 0.2}
            />
        ))}
    </DreiClouds>
);
