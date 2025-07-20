import { useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { motion } from '../../../utils/fakeMotion';
import { QualifyingEntry, useQualifyingStore } from '../../../store/qualifyingStore';
import useTimer from '../../../hooks/useTimer';
import { parseTime, formatTime } from '../../../utils/time';

interface Props {
  entry: QualifyingEntry;
  index: number;
}

function QualifyingRow({ entry, index }: Props) {
  const update = useQualifyingStore((s) => s.updateEntry);
  const remove = useQualifyingStore((s) => s.removeEntry);
  const { seconds, running, start, stop, reset, setSeconds } = useTimer(parseTime(entry.time));

  useEffect(() => {
    update(entry.id, { time: formatTime(seconds) });
  }, [seconds, entry.id, update]);

  const incRolls = (delta: number) => {
    update(entry.id, { rolls: Math.max(0, entry.rolls + delta) });
  };

  const incPenalty = (delta: number) => {
    update(entry.id, { penalty: Math.max(0, entry.penalty + delta) });
  };

  const handleResetTimer = () => {
    reset();
    setSeconds(0);
  };

  return (
    <motion.tr layout className="text-amber-400">
      <td className="p-2">{index + 1}</td>
      <td className="p-2">
        <input
          className="bg-gray-800 border border-gray-700 rounded p-1 text-white"
          value={entry.name}
          onChange={(e) => update(entry.id, { name: e.target.value })}
        />
      </td>
      <td className="p-2">
        <div className="flex items-center gap-1">
          <span className="w-16 text-center font-mono">{formatTime(seconds)}</span>
          <button
            className="bg-gray-700 rounded-full p-1 hover:bg-lime-600"
            onClick={running ? stop : start}
            aria-label="start-stop"
          >
            {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            className="bg-gray-700 rounded-full p-1 hover:bg-lime-600"
            onClick={handleResetTimer}
            aria-label="reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </td>
      <td className="p-2">
        <div className="flex items-center gap-1">
          <button
            className="bg-gray-700 rounded-full px-2 hover:bg-lime-600 text-xl"
            onClick={() => incRolls(-1)}
          >
            –
          </button>
          <span className="w-6 text-center">{entry.rolls}</span>
          <button
            className="bg-gray-700 rounded-full px-2 hover:bg-lime-600 text-xl"
            onClick={() => incRolls(1)}
          >
            +
          </button>
          <button
            className="bg-gray-700 rounded-full px-2 hover:bg-lime-600 text-xs"
            onClick={() => update(entry.id, { rolls: 0 })}
          >
            Reset
          </button>
        </div>
      </td>
      <td className="p-2">
        <div className="flex items-center gap-1">
          <button
            className="bg-gray-700 rounded-full px-2 hover:bg-lime-600 text-xl"
            onClick={() => incPenalty(-1)}
          >
            –
          </button>
          <span className="w-6 text-center">{entry.penalty}</span>
          <button
            className="bg-gray-700 rounded-full px-2 hover:bg-lime-600 text-xl"
            onClick={() => incPenalty(1)}
          >
            +
          </button>
          <button
            className="bg-gray-700 rounded-full px-2 hover:bg-lime-600 text-xs"
            onClick={() => update(entry.id, { penalty: 0 })}
          >
            Reset
          </button>
        </div>
      </td>
      <td className="p-2">
        <button className="text-red-500" onClick={() => remove(entry.id)}>
          X
        </button>
      </td>
    </motion.tr>
  );
}

export default QualifyingRow;
