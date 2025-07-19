import { toast } from 'react-hot-toast';
import QualifyingEntryForm from './QualifyingEntryForm';
import QualifyingTable from './QualifyingTable';
import { useQualifyingStore } from '../../../store/qualifyingStore';
import { sortEntries } from './QualifyingTable';

interface QualifyingPanelProps {
  onConfirm?: (entries: ReturnType<typeof sortEntries>) => void;
}

function QualifyingPanel({ onConfirm }: QualifyingPanelProps) {
  const entries = useQualifyingStore((s) => s.entries);
  const clear = useQualifyingStore((s) => s.clear);

  const handleConfirm = () => {
    const sorted = sortEntries(entries);
    if (onConfirm) {
      onConfirm(sorted);
    }
    toast.success('Clasificación confirmada');
    clear();
  };

  return (
    <div className="max-w-xl mx-auto bg-gray-900 rounded-xl p-4 text-lime-300">
      <h2 className="text-2xl font-bold mb-4 text-center">Clasificación</h2>
      <QualifyingEntryForm />
      <QualifyingTable />
      {entries.length > 0 && (
        <button className="btn-primary mt-4" onClick={handleConfirm}>
          Confirmar Clasificación
        </button>
      )}
    </div>
  );
}

export default QualifyingPanel;
