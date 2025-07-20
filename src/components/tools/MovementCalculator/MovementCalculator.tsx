import { useEffect, useState } from 'react';
import {
  getGearRange,
  probabilityToHandleCurve,
  suggestGearForCurve,
  Lane,
  CurveDirection,
  Curve,
} from '../../../utils/formulaD';

function MovementCalculator() {
  const [gear, setGear] = useState(1);
  const [distance, setDistance] = useState(1);
  const [currentLane, setCurrentLane] = useState<Lane>('medio');
  const [targetLane, setTargetLane] = useState<Lane>('medio');
  const [direction, setDirection] = useState<CurveDirection>('derecha');
  const [turns, setTurns] = useState(2);

  useEffect(() => {
    const defaults: Record<Lane, number> = {
      exterior: 1,
      medio: 2,
      interior: 3,
    };
    setTurns(defaults[targetLane]);
  }, [targetLane]);

  const curve: Curve = {
    lane: targetLane,
    direction,
    requiredTurns: turns,
  };

  const range = getGearRange(gear);
  const prob = probabilityToHandleCurve(gear, distance, curve);
  const suggestion = suggestGearForCurve(distance, curve);

  const laneIndex: Record<Lane, number> = {
    interior: 0,
    medio: 1,
    exterior: 2,
  };

  let warning: string | null = null;
  const diff = Math.abs(laneIndex[currentLane] - laneIndex[targetLane]);
  if (diff > 1) {
    warning = 'Cambio de carril ilegal (más de uno)';
  } else if (
    (direction === 'derecha' && laneIndex[targetLane] > laneIndex[currentLane]) ||
    (direction === 'izquierda' && laneIndex[targetLane] < laneIndex[currentLane])
  ) {
    warning = 'Dirección de cambio de carril contraria a la curva';
  }

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
          <label htmlFor="currentLane" className="text-sm">
            Carril actual
            <select
              id="currentLane"
              className="mt-1 w-full rounded border border-gray-700 bg-gray-800 p-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
              value={currentLane}
              onChange={(e) => setCurrentLane(e.target.value as Lane)}
            >
              <option value="exterior" className="text-red-400">Exterior</option>
              <option value="medio" className="text-yellow-400">Medio</option>
              <option value="interior" className="text-green-400">Interior</option>
            </select>
          </label>
          <label htmlFor="targetLane" className="text-sm">
            Carril al entrar
            <select
              id="targetLane"
              className="mt-1 w-full rounded border border-gray-700 bg-gray-800 p-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
              value={targetLane}
              onChange={(e) => setTargetLane(e.target.value as Lane)}
            >
              <option value="exterior" className="text-red-400">Exterior</option>
              <option value="medio" className="text-yellow-400">Medio</option>
              <option value="interior" className="text-green-400">Interior</option>
            </select>
          </label>
          <label htmlFor="direction" className="text-sm">
            Dirección de la curva
            <select
              id="direction"
              className="mt-1 w-full rounded border border-gray-700 bg-gray-800 p-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
              value={direction}
              onChange={(e) => setDirection(e.target.value as CurveDirection)}
            >
              <option value="derecha">Derecha</option>
              <option value="izquierda">Izquierda</option>
            </select>
          </label>
          <label htmlFor="turns" className="text-sm">
            Turnos mínimos en el carril
            <input
              id="turns"
              type="number"
              className="mt-1 w-full rounded border border-gray-700 bg-gray-800 p-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
              value={turns}
              min={1}
              onChange={(e) => setTurns(Number(e.target.value))}
            />
          </label>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <p>
            Rango de tirada para marcha {gear}: {range.min}-{range.max}
          </p>
          <p>Longitud de la curva: {prob.length} casillas</p>
          <p>Prob. de quedarse antes: {(prob.before * 100).toFixed(0)}%</p>
          <p>Prob. de entrar legalmente: {(prob.inCurve * 100).toFixed(0)}%</p>
          <p>Prob. de pasarse: {(prob.overshoot * 100).toFixed(0)}%</p>
          <p className="mt-2 font-semibold">Marcha sugerida: {suggestion}</p>
          {warning && <p className="text-red-400">{warning}</p>}
        </div>
      </div>
    </div>
  );
}

export default MovementCalculator;
