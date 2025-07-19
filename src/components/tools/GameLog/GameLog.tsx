import { useState } from 'react';
import { useGameStore, LogEntry } from '../../../store/gameStore';

function GameLog() {
  const logs = useGameStore((s) => s.logs);
  const addLog = useGameStore((s) => s.addLog);
  const save = useGameStore((s) => s.save);
  const load = useGameStore((s) => s.load);

  const [player, setPlayer] = useState('');
  const [gear, setGear] = useState(1);
  const [roll, setRoll] = useState(0);
  const [movement, setMovement] = useState(0);

  const handleAdd = () => {
    const entry: LogEntry = {
      player,
      gear,
      roll,
      movement,
      damages: {},
    };
    addLog(entry);
    setPlayer('');
    setRoll(0);
    setMovement(0);
  };

  const handleExport = () => {
    save();
    const data = JSON.stringify(logs, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'logs.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="border p-4 rounded shadow max-w-md mt-4">
      <h2 className="text-xl font-semibold mb-2">Registro de Partidas</h2>
      <div className="flex flex-col gap-2">
        <label>
          Jugador:
          <input
            className="ml-2 border p-1"
            value={player}
            onChange={(e) => setPlayer(e.target.value)}
          />
        </label>
        <label>
          Marcha:
          <input
            type="number"
            className="ml-2 border p-1 w-20"
            value={gear}
            min={1}
            onChange={(e) => setGear(Number(e.target.value))}
          />
        </label>
        <label>
          Tirada:
          <input
            type="number"
            className="ml-2 border p-1 w-20"
            value={roll}
            onChange={(e) => setRoll(Number(e.target.value))}
          />
        </label>
        <label>
          Movimiento:
          <input
            type="number"
            className="ml-2 border p-1 w-20"
            value={movement}
            onChange={(e) => setMovement(Number(e.target.value))}
          />
        </label>
        <button className="bg-blue-500 text-white px-2 py-1" onClick={handleAdd}>
          Añadir entrada
        </button>
        <button className="bg-green-500 text-white px-2 py-1" onClick={handleExport}>
          Exportar JSON
        </button>
        <button className="bg-gray-200 px-2 py-1" onClick={load}>
          Cargar
        </button>
        <div className="mt-2">
          {logs.map((l, i) => (
            <p key={i}>
              {l.player} – marcha {l.gear} – tirada {l.roll} – mov {l.movement}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GameLog;
