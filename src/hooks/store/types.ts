import type { IBuilding } from '../../api/types';

export interface IslandCreateModal {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export interface SlotActivateModal {
    isOpen: boolean;
    slotNumber: number | null;
    open: (slotNumber: number) => void;
    close: () => void;
}

export interface BuildModal {
    isOpen: boolean;
    slotNumber: number | null;
    open: (slotNumber: number) => void;
    close: () => void;
}

export interface BuildingManageModal {
    isOpen: boolean;
    slotNumber: number | null;
    building: IBuilding | null;
    open: (slotNumber: number, building: IBuilding) => void;
    close: () => void;
}
