import { create } from 'zustand';

import type { LevelUpNoticeModal } from './types';

const useLevelUpNoticeModal = create<LevelUpNoticeModal>((set) => ({
    isOpen: false,
    unlockedItems: [],
    unlockedBuildings: [],
    open: ({ unlockedItems, unlockedBuildings }) =>
        set({ isOpen: true, unlockedItems, unlockedBuildings }),
    close: () => set({ isOpen: false, unlockedItems: [], unlockedBuildings: [] }),
}));

export default useLevelUpNoticeModal;
