import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface QualifyingEntry {
  id: string;
  name: string;
  time: string;
  rolls: number;
  penalty: number;
}

interface QualifyingState {
  entries: QualifyingEntry[];
  addEntry: (e: Omit<QualifyingEntry, 'id'>) => void;
  updateEntry: (id: string, e: Partial<QualifyingEntry>) => void;
  removeEntry: (id: string) => void;
  clear: () => void;
}

export const useQualifyingStore = create<QualifyingState>(
  persist(
    (set) => ({
      entries: [],
      addEntry: (e) =>
        set((state) => ({
          entries: [...state.entries, { ...e, id: `${Date.now()}-${Math.random()}` }],
        })),
      updateEntry: (id, e) =>
        set((state) => ({
          entries: state.entries.map((en) => (en.id === id ? { ...en, ...e } : en)),
        })),
      removeEntry: (id) =>
        set((state) => ({ entries: state.entries.filter((en) => en.id !== id) })),
      clear: () => set({ entries: [] }),
    }),
    {
      name: 'qualifying',
    },
  ),
);
