import { create } from 'zustand';

import type { SlotActivateModal } from './types';

const useSlotActivateModal = create<SlotActivateModal>((set) => ({
    isOpen: false,
    slotNumber: null,
    open: (slotNumber: number) => set({ isOpen: true, slotNumber }),
    close: () => set({ isOpen: false, slotNumber: null }),
}));

export default useSlotActivateModal;
