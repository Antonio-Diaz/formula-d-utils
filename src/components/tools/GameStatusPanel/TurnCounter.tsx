import { useStatusStore } from '../../../store/statusStore';
import { Minus, Plus } from 'lucide-react';

function TurnCounter() {
  const turn = useStatusStore((s) => s.turn);
  const inc = useStatusStore((s) => s.incTurn);
  const dec = useStatusStore((s) => s.decTurn);
  const start = useStatusStore((s) => s.startPlayer);
  const setStart = useStatusStore((s) => s.setStartPlayer);

  return (
    <div className="rounded-xl bg-gray-800 text-lime-400 shadow-md p-4 flex flex-col gap-2">
      <h3 className="font-semibold">Turno</h3>
      <div className="flex items-center gap-2">
        <button className="bg-gray-700 p-1 rounded" onClick={dec} aria-label="-">
          <Minus className="w-4 h-4" />
        </button>
        <span className="text-xl font-bold w-8 text-center">{turn}</span>
        <button className="bg-gray-700 p-1 rounded" onClick={inc} aria-label="+">
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <input
        className="bg-gray-700 rounded px-2 text-white"
        placeholder="Jugador inicial"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
    </div>
  );
}

export default TurnCounter;
