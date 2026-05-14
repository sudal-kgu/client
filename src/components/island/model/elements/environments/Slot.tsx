import { useState } from 'react';

import type { ThreeEvent } from '@react-three/fiber';
import { toast } from 'sonner';

import useBuilding from '../../../../../api/hooks/useBuilding';
import type { IActivatedSlot, IInactivatedSlot } from '../../../../../api/types';
import useBuildModal from '../../../../../hooks/store/useBuildModal';
import useBuildingManageModal from '../../../../../hooks/store/useBuildingManageModal';
import useEditMode from '../../../../../hooks/store/useEditMode';
import useSlotActivateModal from '../../../../../hooks/store/useSlotActivateModal';
import type { ISlotPosition } from '../../config/types';
import Building from './Building';

interface Props {
    position: ISlotPosition;
    slot: IInactivatedSlot | IActivatedSlot;
    canActivate: boolean;
}

const COLORS = {
    locked: {
        outer: { base: '#555560', hover: '#666672' },
        inner: { base: '#484854', hover: '#585868' },
        stake: { base: '#505060', hover: '#606074' },
        ring: { base: '#484858', hover: '#584830' },
        ringEmissive: { base: '#101020', hover: '#301808' },
    },
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

const EDIT_RING: Record<
    'source' | 'target' | 'disabled',
    { color: string; emissive: string; intensity: number }
> = {
    source: { color: '#d47820', emissive: '#b05010', intensity: 1.2 },
    target: { color: '#40b860', emissive: '#207040', intensity: 1.2 },
    disabled: { color: '#303030', emissive: '#000000', intensity: 0 },
};

const SlotPlatform = ({
    activated,
    hovered,
    showIndicator,
    locked,
    editState,
}: {
    activated: boolean;
    hovered: boolean;
    showIndicator: boolean;
    locked: boolean;
    editState?: 'source' | 'target' | 'disabled';
}) => {
    const c = activated ? COLORS.active : locked ? COLORS.locked : COLORS.inactive;
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
                        {editState ? (
                            <meshLambertMaterial
                                color={EDIT_RING[editState].color}
                                emissive={EDIT_RING[editState].emissive}
                                emissiveIntensity={EDIT_RING[editState].intensity}
                            />
                        ) : (
                            <meshLambertMaterial
                                color={hovered ? c.ring.hover : c.ring.base}
                                emissive={hovered ? c.ringEmissive.hover : c.ringEmissive.base}
                                emissiveIntensity={hovered ? 0.6 : 0.15}
                            />
                        )}
                    </mesh>
                </>
            )}
        </>
    );
};

const Slot = ({ slot, position, canActivate }: Props) => {
    const [hovered, setHovered] = useState(false);
    const { open: openActivate } = useSlotActivateModal();
    const { open: openBuild } = useBuildModal();
    const { open: openManage } = useBuildingManageModal();
    const { isActive: isEditMode, fromSlotNumber, deactivate } = useEditMode();
    const { moveBuilding } = useBuilding();

    const hasBuilding = slot.activated && slot.building !== null;
    const isLocked = !slot.activated && !canActivate;

    const editState = (() => {
        if (!isEditMode) return undefined;
        if (slot.slotNumber === fromSlotNumber) return 'source' as const;
        if (slot.activated) return 'target' as const;
        return 'disabled' as const;
    })();

    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();

        if (isEditMode) {
            if (editState === 'source') {
                deactivate();
            } else if (editState === 'target') {
                moveBuilding(
                    { fromSlotNumber: fromSlotNumber!, toSlotNumber: slot.slotNumber },
                    { onSuccess: deactivate },
                );
            }
            return;
        }

        if (!slot.activated) {
            if (!canActivate) {
                toast.warning('슬롯을 더 이상 활성화할 수 없어요.');
                return;
            }
            openActivate(slot);
        } else if (slot.building === null) {
            openBuild(slot.slotNumber);
        } else {
            openManage(slot.slotNumber, slot.building);
        }
    };

    const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        if (isEditMode && editState === 'disabled') return;
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
                locked={isLocked}
                editState={editState}
            />
            {hasBuilding && <Building building={slot.building!} />}
        </group>
    );
};

export default Slot;
