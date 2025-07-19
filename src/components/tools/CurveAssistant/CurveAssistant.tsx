import { useState } from 'react';
import { motion } from 'framer-motion';
import { suggestGear } from '../../../utils/formulaD';

function CurveAssistant() {
  const [distance, setDistance] = useState(10);
  const [turns, setTurns] = useState(1);

  const recommendations: number[] = [];
  let remaining = distance;
  for (let t = 0; t < turns; t++) {
    const avg = Math.ceil(remaining / (turns - t));
    const gear = suggestGear(avg);
    recommendations.push(gear);
    remaining -= avg;
  }

  return (
    <motion.div
      className="border p-4 rounded shadow max-w-md mt-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <h2 className="text-xl font-semibold mb-2">Asistente de Curvas</h2>
      <div className="flex flex-col gap-2">
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
        <label>
          Turnos disponibles:
          <input
            type="number"
            className="ml-2 border p-1 w-20"
            value={turns}
            min={1}
            onChange={(e) => setTurns(Number(e.target.value))}
          />
        </label>
        <div className="mt-2">
          {recommendations.map((g, i) => (
            <p key={i}>Turno {i + 1}: marcha sugerida {g}</p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default CurveAssistant;
