import { useState } from 'react';
import Layout, { ToolId } from './components/layout/Layout';
import MovementCalculator from './components/tools/MovementCalculator/MovementCalculator';
import DiceRoller from './components/tools/DiceRoller/DiceRoller';
import DamagePanel from './components/tools/DamagePanel/DamagePanel';
import CurveAssistant from './components/tools/CurveAssistant/CurveAssistant';
import GameLog from './components/tools/GameLog/GameLog';
import QualifyingPanel from './components/tools/QualifyingPanel/QualifyingPanel';

function App() {
  const [tool, setTool] = useState<ToolId>('movement');

  let content: JSX.Element;
  switch (tool) {
    case 'dice':
      content = <DiceRoller />;
      break;
    case 'damage':
      content = <DamagePanel />;
      break;
    case 'curve':
      content = <CurveAssistant />;
      break;
    case 'qualify':
      content = <QualifyingPanel />;
      break;
    case 'log':
      content = <GameLog />;
      break;
    case 'movement':
    default:
      content = <MovementCalculator />;
  }

  return (
    <Layout current={tool} setCurrent={setTool}>
      {content}
    </Layout>
  );
}

export default App;
