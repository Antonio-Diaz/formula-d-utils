import PlayerRanking from './PlayerRanking';
import TurnCounter from './TurnCounter';
import TurnTimer from './TurnTimer';

function GameStatusPanel() {
  return (
    <div className="space-y-4">
      <PlayerRanking />
      <TurnCounter />
      <TurnTimer />
    </div>
  );
}

export default GameStatusPanel;
