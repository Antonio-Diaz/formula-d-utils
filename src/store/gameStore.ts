import create from 'zustand';

export interface CarState {
  brakes: number;
  gearbox: number;
  engine: number;
  body: number;
  tires: number;
}

export interface LogEntry {
  player: string;
  gear: number;
  roll: number;
  movement: number;
  damages: Partial<CarState>;
}

interface GameState {
  car: CarState;
  logs: LogEntry[];
  updateCar: (c: Partial<CarState>) => void;
  addLog: (l: LogEntry) => void;
  load: () => void;
  save: () => void;
}

const emptyCar: CarState = {
  brakes: 0,
  gearbox: 0,
  engine: 0,
  body: 0,
  tires: 0,
};

export const useGameStore = create<GameState>((set, get) => ({
  car: emptyCar,
  logs: [],
  updateCar: (c) => set((state) => ({ car: { ...state.car, ...c } })),
  addLog: (l) => set((state) => ({ logs: [...state.logs, l] })),
  load: () => {
    const logs = localStorage.getItem('logs');
    const car = localStorage.getItem('car');
    if (logs) set({ logs: JSON.parse(logs) });
    if (car) set({ car: JSON.parse(car) });
  },
  save: () => {
    const { logs, car } = get();
    localStorage.setItem('logs', JSON.stringify(logs));
    localStorage.setItem('car', JSON.stringify(car));
  },
}));
