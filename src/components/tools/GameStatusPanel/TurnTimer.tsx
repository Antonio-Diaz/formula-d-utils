import { useEffect, useState } from 'react';
import { useStatusStore } from '../../../store/statusStore';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

function format(sec: number) {
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
}

function TurnTimer() {
  const duration = useStatusStore((s) => s.timerDuration);
  const remaining = useStatusStore((s) => s.timerRemaining);
  const running = useStatusStore((s) => s.timerRunning);
  const setDuration = useStatusStore((s) => s.setTimerDuration);
  const setRemaining = useStatusStore((s) => s.setTimerRemaining);
  const setRunning = useStatusStore((s) => s.setTimerRunning);
  const reset = useStatusStore((s) => s.resetTimer);
  const [alerted, setAlerted] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setRemaining((r) => r - 1);
    }, 1000);
    return () => clearInterval(id);
  }, [running, setRemaining]);

  useEffect(() => {
    if (remaining <= 0 && running && !alerted) {
      setRunning(false);
      setAlerted(true);
      toast.error('Tiempo!');
    }
  }, [remaining, running, setRunning, alerted]);

  const handleStart = () => {
    setRunning(true);
    setAlerted(false);
  };

  return (
    <motion.div
      animate={remaining <= 0 ? { borderColor: '#f00' } : { borderColor: '#374151' }}
      className="rounded-xl bg-gray-800 text-lime-400 shadow-md p-4 border-2"
    >
      <h3 className="font-semibold mb-2">Cronómetro</h3>
      <div className="text-3xl font-mono text-center mb-2">{format(Math.max(0, remaining))}</div>
      <div className="flex gap-2 justify-center">
        <button className="bg-gray-700 p-2 rounded" onClick={running ? () => setRunning(false) : handleStart}>
          {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button className="bg-gray-700 p-2 rounded" onClick={() => { reset(); setAlerted(false); }}>
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <input
          type="number"
          className="w-20 bg-gray-700 rounded px-2 text-white"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
        <span>segundos</span>
      </div>
    </motion.div>
  );
}

export default TurnTimer;
