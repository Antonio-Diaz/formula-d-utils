import { useState } from 'react';
import { useStatusStore } from '../../../store/statusStore';

function PlayerRow({ name }: { name: string }) {
  const player = useStatusStore((s) => s.players.find((p) => p.name === name)!);
  const update = useStatusStore((s) => s.updatePlayer);

  return (
    <tr className="border-b border-gray-700">
      <td className="p-1">{player.name}</td>
      <td className="p-1">
        <input
          type="number"
          className="w-16 bg-gray-800 rounded px-1"
          value={player.position}
          onChange={(e) => update(player.name, { position: Number(e.target.value) })}
        />
      </td>
      <td className="p-1">
        <input
          type="number"
          className="w-12 bg-gray-800 rounded px-1"
          value={player.gear}
          onChange={(e) => update(player.name, { gear: Number(e.target.value) })}
        />
      </td>
      <td className="p-1">
        <input
          type="number"
          className="w-12 bg-gray-800 rounded px-1"
          value={player.damage}
          onChange={(e) => update(player.name, { damage: Number(e.target.value) })}
        />
      </td>
    </tr>
  );
}

function PlayerRanking() {
  const players = useStatusStore((s) => s.players);
  const add = useStatusStore((s) => s.addPlayer);
  const [name, setName] = useState('');

  const sorted = [...players].sort((a, b) => a.position - b.position);

  return (
    <div className="rounded-xl bg-gray-800 text-lime-400 shadow-md p-4">
      <h3 className="font-semibold mb-2">Clasificación</h3>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left">Jugador</th>
            <th className="text-left">Posición</th>
            <th className="text-left">Marcha</th>
            <th className="text-left">Daños</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((p) => (
            <PlayerRow key={p.name} name={p.name} />
          ))}
        </tbody>
      </table>
      <div className="mt-2 flex gap-2">
        <input
          className="flex-1 bg-gray-700 rounded px-2 text-white"
          placeholder="Nuevo jugador"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="btn-primary"
          onClick={() => {
            if (!name) return;
            add({ name, position: 0, gear: 1, damage: 0 });
            setName('');
          }}
        >
          Añadir
        </button>
      </div>
    </div>
  );
}

export default PlayerRanking;
