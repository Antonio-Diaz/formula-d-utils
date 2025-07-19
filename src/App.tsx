import MovementCalculator from './components/tools/MovementCalculator/MovementCalculator';
import DiceRoller from './components/tools/DiceRoller/DiceRoller';
import DamagePanel from './components/tools/DamagePanel/DamagePanel';
import CurveAssistant from './components/tools/CurveAssistant/CurveAssistant';
import GameLog from './components/tools/GameLog/GameLog';

function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Formula D Utils</h1>
      <MovementCalculator />
      <DiceRoller />
      <DamagePanel />
      <CurveAssistant />
      <GameLog />
    </div>
  );
}

export default App;
