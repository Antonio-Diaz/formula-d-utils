import { useState } from 'react';
import { motion } from 'framer-motion';
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
    <motion.div
      className="border p-4 rounded shadow max-w-md"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <h2 className="text-xl font-semibold mb-2">Calculadora de Movimiento</h2>
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
        <label>
          Casillas hasta curva:
          <input
            type="number"
            className="ml-2 border p-1 w-20"
            value={distance}
            min={1}
            onChange={(e) => setDistance(Number(e.target.value))}
          />
        </label>
      </div>
      <div className="mt-4">
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
    </motion.div>
  );
}

export default MovementCalculator;
