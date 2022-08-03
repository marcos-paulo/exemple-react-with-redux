import { StatusGameType } from "../../gameJumpTypes";

import "./index.scss";

interface StartGameProps {
  statusGame: StatusGameType;
  onStartGame: () => void;
}
export const StartGameComponent = ({
  statusGame,
  onStartGame,
}: StartGameProps) => (
  <>
    {statusGame !== "running" && (
      <div className="game-start-panel">
        <button
          onClick={(event) => {
            onStartGame();
          }}
        >
          Start new Game
        </button>
      </div>
    )}
  </>
);
