import { create } from 'zustand';

import type { LevelUpNoticeModal } from './types';

const useLevelUpNoticeModal = create<LevelUpNoticeModal>((set) => ({
    isOpen: false,
    unlockedItems: [],
    unlockedBuildings: [],
    maxSlotCount: null,
    open: ({ unlockedItems, unlockedBuildings, maxSlotCount }) =>
        set({ isOpen: true, unlockedItems, unlockedBuildings, maxSlotCount }),
    close: () =>
        set({ isOpen: false, unlockedItems: [], unlockedBuildings: [], maxSlotCount: null }),
}));

export default useLevelUpNoticeModal;
