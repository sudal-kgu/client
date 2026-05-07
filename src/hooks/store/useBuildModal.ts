import { create } from 'zustand';

import type { BuildModal } from './types';

const useBuildModal = create<BuildModal>((set) => ({
    isOpen: false,
    slotNumber: null,
    open: (slotNumber: number) => set({ isOpen: true, slotNumber }),
    close: () => set({ isOpen: false, slotNumber: null }),
}));

export default useBuildModal;
