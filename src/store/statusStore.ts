import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PlayerInfo {
  name: string;
  position: number;
  gear: number;
  damage: number;
}

interface StatusState {
  players: PlayerInfo[];
  turn: number;
  startPlayer: string;
  timerDuration: number;
  timerRemaining: number;
  timerRunning: boolean;
  addPlayer: (p: PlayerInfo) => void;
  updatePlayer: (name: string, data: Partial<PlayerInfo>) => void;
  setTurn: (t: number) => void;
  incTurn: () => void;
  decTurn: () => void;
  setStartPlayer: (name: string) => void;
  setTimerDuration: (sec: number) => void;
  setTimerRemaining: (sec: number) => void;
  setTimerRunning: (r: boolean) => void;
  resetTimer: () => void;
}

export const useStatusStore = create<StatusState>()(
  persist(
    (set, get) => ({
      players: [],
      turn: 1,
      startPlayer: '',
      timerDuration: 120,
      timerRemaining: 120,
      timerRunning: false,
      addPlayer: (p) =>
        set((state) => ({ players: [...state.players, p] })),
      updatePlayer: (name, data) =>
        set((state) => ({
          players: state.players.map((pl) =>
            pl.name === name ? { ...pl, ...data } : pl
          ),
        })),
      setTurn: (t) => set({ turn: t }),
      incTurn: () => set((s) => ({ turn: s.turn + 1 })),
      decTurn: () => set((s) => ({ turn: Math.max(1, s.turn - 1) })),
      setStartPlayer: (name) => set({ startPlayer: name }),
      setTimerDuration: (sec) =>
        set({ timerDuration: sec, timerRemaining: sec }),
      setTimerRemaining: (sec) => set({ timerRemaining: sec }),
      setTimerRunning: (r) => set({ timerRunning: r }),
      resetTimer: () =>
        set((s) => ({
          timerRemaining: s.timerDuration,
          timerRunning: false,
        })),
    }),
    { name: 'status-store' }
  )
);
