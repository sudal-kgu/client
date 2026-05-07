import { useState } from 'react';

import type { ThreeEvent } from '@react-three/fiber';

import type { IActivatedSlot, IInactivatedSlot } from '../../../../../api/types';
import useBuildModal from '../../../../../hooks/store/useBuildModal';
import useBuildingManageModal from '../../../../../hooks/store/useBuildingManageModal';
import useSlotActivateModal from '../../../../../hooks/store/useSlotActivateModal';
import type { ISlotPosition } from '../../config/types';
import Building from './Building';

interface Props {
    position: ISlotPosition;
    slot: IInactivatedSlot | IActivatedSlot;
}

const COLORS = {
    active: {
        outer: { base: '#8a7060', hover: '#b8a090' },
        inner: { base: '#a09080', hover: '#d4c4b0' },
        stake: { base: '#907060', hover: '#c8b8a0' },
        ring: { base: '#7a5828', hover: '#d4a040' },
        ringEmissive: { base: '#331a00', hover: '#aa6600' },
    },
    inactive: {
        outer: { base: '#7a7a86', hover: '#9a9aaa' },
        inner: { base: '#6a6a78', hover: '#8a8a9a' },
        stake: { base: '#707080', hover: '#9090a4' },
        ring: { base: '#636370', hover: '#9a6840' },
        ringEmissive: { base: '#1a1a28', hover: '#603018' },
    },
};

const SlotPlatform = ({
    activated,
    hovered,
    showIndicator,
}: {
    activated: boolean;
    hovered: boolean;
    showIndicator: boolean;
}) => {
    const c = activated ? COLORS.active : COLORS.inactive;
    return (
        <>
            <mesh position={[0, 0.015, 0]} receiveShadow>
                <cylinderGeometry args={[1.18, 1.28, 0.06, 10]} />
                <meshLambertMaterial color={hovered ? c.outer.hover : c.outer.base} />
            </mesh>
            <mesh position={[0, 0.07, 0]} receiveShadow>
                <cylinderGeometry args={[1.05, 1.15, 0.1, 10]} />
                <meshLambertMaterial color={hovered ? c.inner.hover : c.inner.base} />
            </mesh>
            {showIndicator && (
                <>
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
                                    color={hovered ? c.stake.hover : c.stake.base}
                                    emissive={hovered && !activated ? '#503020' : '#000000'}
                                    emissiveIntensity={hovered && !activated ? 0.2 : 0}
                                />
                            </mesh>
                        );
                    })}
                    <mesh position={[0, 0.09, 0]} rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[1.1, 0.018, 6, 32]} />
                        <meshLambertMaterial
                            color={hovered ? c.ring.hover : c.ring.base}
                            emissive={hovered ? c.ringEmissive.hover : c.ringEmissive.base}
                            emissiveIntensity={hovered ? 0.6 : 0.15}
                        />
                    </mesh>
                </>
            )}
        </>
    );
};

const Slot = ({ slot, position }: Props) => {
    const [hovered, setHovered] = useState(false);
    const { open: openActivate } = useSlotActivateModal();
    const { open: openBuild } = useBuildModal();
    const { open: openManage } = useBuildingManageModal();

    const hasBuilding = slot.activated && slot.building !== null;

    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        if (!slot.activated) {
            openActivate(slot.slotNumber);
        } else if (slot.building === null) {
            openBuild(slot.slotNumber);
        } else {
            openManage(slot.slotNumber, slot.building);
        }
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
            <SlotPlatform
                activated={slot.activated}
                hovered={hovered}
                showIndicator={!hasBuilding}
            />
            {hasBuilding && <Building building={slot.building!} />}
        </group>
    );
};

export default Slot;
