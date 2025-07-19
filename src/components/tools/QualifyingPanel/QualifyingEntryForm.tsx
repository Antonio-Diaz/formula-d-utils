import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useQualifyingStore } from '../../../store/qualifyingStore';
import { motion } from '../../../utils/fakeMotion';

function QualifyingEntryForm() {
  const addEntry = useQualifyingStore((s) => s.addEntry);
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [rolls, setRolls] = useState(0);
  const [penalty, setPenalty] = useState(0);

  const handleAdd = () => {
    if (!name || !time) {
      toast.error('Nombre y tiempo requeridos');
      return;
    }
    addEntry({ name, time, rolls, penalty });
    toast.success('Resultado agregado');
    setName('');
    setTime('');
    setRolls(0);
    setPenalty(0);
  };

  return (
    <motion.div layout className="card bg-gray-900 rounded-xl text-lime-300">
      <div className="flex flex-col gap-2">
        <label className="text-amber-400">
          Nombre
          <input
            className="ml-2 rounded bg-gray-800 border border-gray-700 p-1 text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="text-amber-400">
          Tiempo
          <input
            className="ml-2 rounded bg-gray-800 border border-gray-700 p-1 text-white"
            placeholder="MM:SS"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>
        <label className="text-amber-400">
          Tiradas
          <input
            type="number"
            className="ml-2 rounded bg-gray-800 border border-gray-700 p-1 text-white w-20"
            min={0}
            value={rolls}
            onChange={(e) => setRolls(Number(e.target.value))}
          />
        </label>
        <label className="text-amber-400">
          Penalización
          <input
            type="number"
            className="ml-2 rounded bg-gray-800 border border-gray-700 p-1 text-white w-20"
            value={penalty}
            onChange={(e) => setPenalty(Number(e.target.value))}
          />
        </label>
        <button className="btn-primary self-start mt-2" onClick={handleAdd}>
          Agregar resultado
        </button>
      </div>
    </motion.div>
  );
}

export default QualifyingEntryForm;
