import { useState } from 'react';

import type { ThreeEvent } from '@react-three/fiber';

import type { ISlotPosition } from '../../config/types';

interface Props {
    position: ISlotPosition;
}

const Slot = ({ position }: Props) => {
    const [hovered, setHovered] = useState(false);

    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        console.log('건물 생성', position.id);
    };

    const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
    };

    const handlePointerOut = () => {
        setHovered(false);
        document.body.style.cursor = 'default';
    };

    return (
        <group
            position={position.pos}
            rotation={[0, position.rotationY ?? 0, 0]}
            onClick={handleClick}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
        >
            <mesh position={[0, 0.015, 0]} receiveShadow>
                <cylinderGeometry args={[1.18, 1.28, 0.06, 10]} />
                <meshLambertMaterial color={hovered ? '#b8a090' : '#8a7060'} />
            </mesh>
            <mesh position={[0, 0.07, 0]} receiveShadow>
                <cylinderGeometry args={[1.05, 1.15, 0.1, 10]} />
                <meshLambertMaterial color={hovered ? '#d4c4b0' : '#a09080'} />
            </mesh>
            {Array.from({ length: 8 }, (_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                return (
                    <mesh
                        key={i}
                        position={[Math.cos(angle) * 0.98, 0.1, Math.sin(angle) * 0.98]}
                        castShadow
                    >
                        <cylinderGeometry args={[0.055, 0.07, 0.22, 6]} />
                        <meshLambertMaterial
                            color={hovered ? '#c8b8a0' : '#907060'}
                            emissive={hovered ? '#4a3010' : '#000000'}
                            emissiveIntensity={hovered ? 0.3 : 0}
                        />
                    </mesh>
                );
            })}
            <mesh position={[0, 0.09, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.1, 0.018, 6, 32]} />
                <meshLambertMaterial
                    color={hovered ? '#d4a040' : '#7a5828'}
                    emissive={hovered ? '#aa6600' : '#331a00'}
                    emissiveIntensity={hovered ? 0.6 : 0.15}
                />
            </mesh>
        </group>
    );
};

export default Slot;
