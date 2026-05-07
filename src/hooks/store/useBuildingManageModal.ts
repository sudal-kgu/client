import { create } from 'zustand';

import type { BuildingManageModal } from './types';

const useBuildingManageModal = create<BuildingManageModal>((set) => ({
    isOpen: false,
    slotNumber: null,
    building: null,
    open: (slotNumber, building) => set({ isOpen: true, slotNumber, building }),
    close: () => set({ isOpen: false, slotNumber: null, building: null }),
}));

export default useBuildingManageModal;
