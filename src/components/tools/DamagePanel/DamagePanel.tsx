import { useGameStore } from '../../../store/gameStore';
import { motion } from 'framer-motion';

function Counter({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  const alert = value >= 5 ? 'text-red-600' : '';
  return (
    <div className="flex items-center gap-2">
      <span className={alert}>{label}: {value}</span>
      <button className="bg-gray-200 px-2" onClick={() => onChange(value - 1)}>-</button>
      <button className="bg-gray-200 px-2" onClick={() => onChange(value + 1)}>+</button>
    </div>
  );
}

function DamagePanel() {
  const car = useGameStore((s) => s.car);
  const updateCar = useGameStore((s) => s.updateCar);

  return (
    <motion.div
      className="border p-4 rounded shadow max-w-md mt-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <h2 className="text-xl font-semibold mb-2">Panel del Auto</h2>
      <div className="flex flex-col gap-2">
        <Counter label="Frenos" value={car.brakes} onChange={(v) => updateCar({ brakes: v })} />
        <Counter label="Caja" value={car.gearbox} onChange={(v) => updateCar({ gearbox: v })} />
        <Counter label="Motor" value={car.engine} onChange={(v) => updateCar({ engine: v })} />
        <Counter label="Carrocería" value={car.body} onChange={(v) => updateCar({ body: v })} />
        <Counter label="Ruedas" value={car.tires} onChange={(v) => updateCar({ tires: v })} />
      </div>
    </motion.div>
  );
}

export default DamagePanel;
