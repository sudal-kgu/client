import { create } from 'zustand';

import type { IslandCreateModal } from './types';

const useIslandCraeteModal = create<IslandCreateModal>((set) => ({
    isOpen: false,
    setIsOpen: (open: boolean) => {
        set({ isOpen: open });
    },
}));

export default useIslandCraeteModal;
