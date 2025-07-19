import { useState } from 'react';
import {
  getGearRange,
  probabilityToReach,
  suggestGear,
} from '../../../utils/formulaD';

function MovementCalculator() {
  const [gear, setGear] = useState(1);
  const [distance, setDistance] = useState(1);

  const range = getGearRange(gear);
  const prob = probabilityToReach(gear, distance);
  const suggestion = suggestGear(distance);

  return (
    <div className="max-w-xl mx-auto rounded-xl shadow-md p-4 bg-gray-900 text-amber-400">
      <h2 className="text-2xl font-bold mb-4 text-center md:text-left">Calculadora de Movimiento</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <label htmlFor="gear" className="text-sm">
            Marcha
            <select
              id="gear"
              aria-label="Marcha"
              className="mt-1 w-full rounded border border-gray-700 bg-gray-800 p-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
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
          <label htmlFor="distance" className="text-sm">
            Casillas hasta curva
            <input
              id="distance"
              aria-label="Casillas hasta curva"
              type="number"
              className="mt-1 w-full rounded border border-gray-700 bg-gray-800 p-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
              value={distance}
              min={1}
              onChange={(e) => setDistance(Number(e.target.value))}
            />
          </label>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <p>
            Rango de tirada para marcha {gear}: {range.min}-{range.max}
          </p>
          <p>
            Prob. de quedarse corto: {(prob.under * 100).toFixed(0)}%
          </p>
          <p>Prob. de exacto: {(prob.exact * 100).toFixed(0)}%</p>
          <p>Prob. de pasarse: {(prob.over * 100).toFixed(0)}%</p>
          <p className="mt-2 font-semibold">
            Marcha sugerida: {suggestion}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovementCalculator;
