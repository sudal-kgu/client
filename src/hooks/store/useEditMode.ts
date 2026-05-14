import { create } from 'zustand';

import type { EditMode } from './types';

const useEditMode = create<EditMode>((set) => ({
    isActive: false,
    fromSlotNumber: null,
    activate: (fromSlotNumber) => set({ isActive: true, fromSlotNumber }),
    deactivate: () => set({ isActive: false, fromSlotNumber: null }),
}));

export default useEditMode;
