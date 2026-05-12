import { create } from 'zustand';

import type { SlotActivateModal } from './types';

const useSlotActivateModal = create<SlotActivateModal>((set) => ({
    isOpen: false,
    slot: null,
    open: (slot) => set({ isOpen: true, slot }),
    close: () => set({ isOpen: false, slot: null }),
}));

export default useSlotActivateModal;
