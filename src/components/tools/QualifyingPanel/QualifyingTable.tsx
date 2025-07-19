import { useQualifyingStore, QualifyingEntry } from '../../../store/qualifyingStore';
import { motion } from '../../../utils/fakeMotion';

function parseTime(t: string) {
  const [m, s] = t.split(':').map(Number);
  if (isNaN(m) || isNaN(s)) return Infinity;
  return m * 60 + s;
}

export function sortEntries(entries: QualifyingEntry[]) {
  return [...entries].sort((a, b) => {
    const ta = parseTime(a.time);
    const tb = parseTime(b.time);
    if (ta !== tb) return ta - tb;
    if (a.rolls !== b.rolls) return a.rolls - b.rolls;
    return a.penalty - b.penalty;
  });
}

function QualifyingTable() {
  const entries = useQualifyingStore((s) => s.entries);
  const update = useQualifyingStore((s) => s.updateEntry);
  const remove = useQualifyingStore((s) => s.removeEntry);

  const sorted = sortEntries(entries);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="text-lime-300">
          <tr>
            <th className="p-2">Pos</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">Tiempo</th>
            <th className="p-2">Tiradas</th>
            <th className="p-2">Penalización</th>
            <th className="p-2" />
          </tr>
        </thead>
        <tbody>
          {sorted.map((e, index) => (
            <motion.tr key={e.id} layout className="text-amber-400">
              <td className="p-2">{index + 1}</td>
              <td className="p-2">
                <input
                  className="bg-gray-800 border border-gray-700 rounded p-1 text-white"
                  value={e.name}
                  onChange={(ev) => update(e.id, { name: ev.target.value })}
                />
              </td>
              <td className="p-2">
                <input
                  className="bg-gray-800 border border-gray-700 rounded p-1 text-white w-20"
                  value={e.time}
                  onChange={(ev) => update(e.id, { time: ev.target.value })}
                />
              </td>
              <td className="p-2">
                <input
                  type="number"
                  className="bg-gray-800 border border-gray-700 rounded p-1 text-white w-20"
                  value={e.rolls}
                  onChange={(ev) => update(e.id, { rolls: Number(ev.target.value) })}
                />
              </td>
              <td className="p-2">
                <input
                  type="number"
                  className="bg-gray-800 border border-gray-700 rounded p-1 text-white w-20"
                  value={e.penalty}
                  onChange={(ev) => update(e.id, { penalty: Number(ev.target.value) })}
                />
              </td>
              <td className="p-2">
                <button className="text-red-500" onClick={() => remove(e.id)}>
                  X
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default QualifyingTable;
