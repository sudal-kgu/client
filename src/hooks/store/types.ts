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
