import { create } from 'zustand';

const useSceneReady = create<{ ready: boolean; setReady: () => void; reset: () => void }>(
    (set) => ({
        ready: false,
        setReady: () => set({ ready: true }),
        reset: () => set({ ready: false }),
    }),
);

export default useSceneReady;
