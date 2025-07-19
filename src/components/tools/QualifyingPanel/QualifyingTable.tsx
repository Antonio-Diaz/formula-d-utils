import { useQualifyingStore, QualifyingEntry } from '../../../store/qualifyingStore';
import QualifyingRow from './QualifyingRow';
import { parseTime } from '../../../utils/time';

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
            <QualifyingRow key={e.id} entry={e} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default QualifyingTable;
