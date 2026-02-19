import { create } from 'zustand';

export interface DashboardState {
  isUnlocked: boolean;
  unlock: () => void;
  lock: () => void;
}

export const useDashboardStore = create<DashboardState>()((set) => ({
  isUnlocked: false,
  unlock: () => set(() => ({ isUnlocked: true })),
  lock: () => set(() => ({ isUnlocked: false })),
}));
