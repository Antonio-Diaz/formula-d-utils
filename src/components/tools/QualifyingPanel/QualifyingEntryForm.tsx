import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useQualifyingStore } from '../../../store/qualifyingStore';
import { motion } from '../../../utils/fakeMotion';

function QualifyingEntryForm() {
  const addEntry = useQualifyingStore((s) => s.addEntry);
  const [name, setName] = useState('');
  const [time] = useState('00:00');

  const handleAdd = () => {
    if (!name) {
      toast.error('Nombre requerido');
      return;
    }
    addEntry({ name, time, rolls: 0, penalty: 0 });
    toast.success('Resultado agregado');
    setName('');
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
        <button className="btn-primary self-start mt-2" onClick={handleAdd}>
          Agregar resultado
        </button>
      </div>
    </motion.div>
  );
}

export default QualifyingEntryForm;
