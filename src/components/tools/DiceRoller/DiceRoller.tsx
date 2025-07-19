import { useState } from 'react';
import { getGearRange, rollGear } from '../../../utils/formulaD';

function DiceRoller() {
  const [gear, setGear] = useState(1);
  const [result, setResult] = useState<number | null>(null);
  const [count, setCount] = useState(1);
  const [sequence, setSequence] = useState<number[]>([]);

  const handleRoll = () => {
    const r = rollGear(gear);
    setResult(r);
  };

  const handleSimulate = () => {
    const seq: number[] = [];
    for (let i = 0; i < count; i++) {
      seq.push(rollGear(gear));
    }
    setSequence(seq);
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
        <button className="bg-blue-500 text-white px-2 py-1" onClick={handleRoll}>
          Tirar dado
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
            className="bg-green-500 text-white px-2 py-1 ml-2"
            onClick={handleSimulate}
          >
            Simular
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
