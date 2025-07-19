import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Dice5, Play } from 'lucide-react';
import { getGearRange, rollGear } from '../../../utils/formulaD';

function DiceRoller() {
  const [gear, setGear] = useState(1);
  const [result, setResult] = useState<number | null>(null);
  const [count, setCount] = useState(1);
  const [sequence, setSequence] = useState<number[]>([]);

  const handleRoll = () => {
    const r = rollGear(gear);
    setResult(r);
    toast.success(`Resultado: ${r}`);
  };

  const handleSimulate = () => {
    const seq: number[] = [];
    for (let i = 0; i < count; i++) {
      seq.push(rollGear(gear));
    }
    setSequence(seq);
    toast(`Secuencia: ${seq.join(', ')}`);
  };

  const range = getGearRange(gear);

  return (
    <div className="border p-4 rounded shadow max-w-md mt-4">
      <h2 className="text-xl font-semibold mb-2">Simulador de Tiradas</h2>
      <div className="flex flex-col gap-2">
        <label>
          Marcha:
          <select
            className="ml-2 border p-1"
            value={gear}
            onChange={(e) => setGear(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6].map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>
        <p>Rango: {range.min}-{range.max}</p>
        <button
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-1 rounded hover:scale-105 transition-transform focus:outline-none flex items-center gap-1"
          onClick={handleRoll}
        >
          <Dice5 className="w-4 h-4" /> Tirar dado
        </button>
        {result !== null && <p>Resultado: {result}</p>}
        <div className="mt-2">
          <label>
            Turnos a simular:
            <input
              type="number"
              className="ml-2 border p-1 w-20"
              value={count}
              min={1}
              onChange={(e) => setCount(Number(e.target.value))}
            />
          </label>
          <button
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-2 py-1 ml-2 rounded hover:scale-105 transition-transform focus:outline-none flex items-center gap-1"
            onClick={handleSimulate}
          >
            <Play className="w-4 h-4" /> Simular
          </button>
        </div>
        {sequence.length > 0 && (
          <div className="mt-2">
            <p>Secuencia: {sequence.join(', ')}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DiceRoller;
