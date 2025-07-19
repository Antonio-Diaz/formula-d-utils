import { useGameStore } from '../../../store/gameStore';
import { Minus, Plus } from 'lucide-react';

function Counter({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  const alert = value >= 5 ? 'text-red-600' : '';
  return (
    <div className="flex items-center gap-2">
      <span className={`${alert} transition-colors duration-300`}>{label}: {value}</span>
      <button
        className="bg-gradient-to-r from-gray-200 to-gray-300 px-2 rounded hover:scale-105 transition-transform focus:outline-none"
        onClick={() => onChange(value - 1)}
      >
        <Minus className="w-4 h-4" />
      </button>
      <button
        className="bg-gradient-to-r from-gray-200 to-gray-300 px-2 rounded hover:scale-105 transition-transform focus:outline-none"
        onClick={() => onChange(value + 1)}
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}

function DamagePanel() {
  const car = useGameStore((s) => s.car);
  const updateCar = useGameStore((s) => s.updateCar);

  return (
    <div className="border p-4 rounded shadow max-w-md mt-4">
      <h2 className="text-xl font-semibold mb-2">Panel del Auto</h2>
      <div className="flex flex-col gap-2">
        <Counter label="Frenos" value={car.brakes} onChange={(v) => updateCar({ brakes: v })} />
        <Counter label="Caja" value={car.gearbox} onChange={(v) => updateCar({ gearbox: v })} />
        <Counter label="Motor" value={car.engine} onChange={(v) => updateCar({ engine: v })} />
        <Counter label="Carrocería" value={car.body} onChange={(v) => updateCar({ body: v })} />
        <Counter label="Ruedas" value={car.tires} onChange={(v) => updateCar({ tires: v })} />
      </div>
    </div>
  );
}

export default DamagePanel;
