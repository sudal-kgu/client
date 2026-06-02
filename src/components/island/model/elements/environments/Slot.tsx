import { Suspense, useState } from 'react';

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
        outer: { base: '#5e5e58', hover: '#6e6e68' },
        inner: { base: '#505048', hover: '#606058' },
        stake: { base: '#4a4a44', hover: '#5a5a54' },
        ring: { base: '#464a40', hover: '#585c52' },
        ringEmissive: { base: '#06080a', hover: '#10140e' },
    },
    active: {
        outer: { base: '#b0aa9e', hover: '#cac4b6' },
        inner: { base: '#c0bab0', hover: '#d8d2c8' },
        stake: { base: '#80786c', hover: '#9c9286' },
        ring: { base: '#8c6020', hover: '#c89030' },
        ringEmissive: { base: '#2c1800', hover: '#804800' },
    },
    inactive: {
        outer: { base: '#585450', hover: '#6e6a64' },
        inner: { base: '#626058', hover: '#78746c' },
        stake: { base: '#4a4844', hover: '#5e5c56' },
        ring: { base: '#484440', hover: '#625e58' },
        ringEmissive: { base: '#080806', hover: '#141210' },
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
                <cylinderGeometry args={[1.18, 1.3, 0.08, 12]} />
                <meshStandardMaterial
                    color={hovered ? c.outer.hover : c.outer.base}
                    roughness={0.95}
                    metalness={0}
                />
            </mesh>
            <mesh position={[0, 0.08, 0]} receiveShadow>
                <cylinderGeometry args={[1.02, 1.14, 0.1, 12]} />
                <meshStandardMaterial
                    color={hovered ? c.inner.hover : c.inner.base}
                    roughness={0.9}
                    metalness={0}
                />
            </mesh>
            {showIndicator && (
                <>
                    {Array.from({ length: 6 }, (_, i) => {
                        const angle = (i / 6) * Math.PI * 2;
                        return (
                            <mesh
                                key={i}
                                position={[Math.cos(angle) * 0.95, 0.16, Math.sin(angle) * 0.95]}
                                castShadow
                            >
                                <cylinderGeometry args={[0.04, 0.08, 0.3, 6]} />
                                <meshStandardMaterial
                                    color={hovered ? c.stake.hover : c.stake.base}
                                    roughness={0.85}
                                    metalness={0}
                                    emissive={hovered && !activated ? '#402010' : '#000000'}
                                    emissiveIntensity={hovered && !activated ? 0.15 : 0}
                                />
                            </mesh>
                        );
                    })}
                    <mesh position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[1.08, 0.028, 8, 36]} />
                        {editState ? (
                            <meshStandardMaterial
                                color={EDIT_RING[editState].color}
                                emissive={EDIT_RING[editState].emissive}
                                emissiveIntensity={EDIT_RING[editState].intensity}
                                roughness={0.6}
                                metalness={0}
                            />
                        ) : (
                            <meshStandardMaterial
                                color={hovered ? c.ring.hover : c.ring.base}
                                emissive={hovered ? c.ringEmissive.hover : c.ringEmissive.base}
                                emissiveIntensity={hovered ? 0.5 : 0.1}
                                roughness={0.8}
                                metalness={0}
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
            {hasBuilding && (
                <Suspense>
                    <Building building={slot.building!} />
                </Suspense>
            )}
        </group>
    );
};

export default Slot;
