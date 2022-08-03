import { useEffect, useRef, useState } from "react";

import { useAppDispatch } from "../../app/hooks";
import { counterActions } from "../counter/counterSlice";

import { AvatarComponent } from "./components/AvatarComponent";
import { GameCounterComponent } from "./components/GameCounterComponent";
import { ObstacleComponent } from "./components/ObstacleComponent";
import { SceneryComponent } from "./components/SceneryComponent";
import { StartGameComponent } from "./components/StartGameComponent";

import { Avatar } from "./entities/Avatar";
import { Game } from "./entities/Game";
import { Obstacle } from "./entities/Obstacle";
import { Scenery } from "./entities/Scenery";
import { StatusGameType } from "./gameJumpTypes";

import "./GameJump.scss";

export const GameJump = () => {
  const [statusGame, setStatusGame] = useState<StatusGameType>("idle");
  const [game, setGame] = useState<Game>();

  const avatarRef = useRef<HTMLDivElement>(null);
  const obstacleRef = useRef<HTMLImageElement>(null);
  const sceneryRef = useRef<HTMLImageElement>(null);

  const dispatch = useAppDispatch();

  const startGameHandle = () => {
    if (game) {
      game.startGame();
      dispatch(counterActions.reset());
    }
  };

  useEffect(() => {
    if (avatarRef.current && obstacleRef.current && sceneryRef.current) {
      const avatar = new Avatar(avatarRef.current);
      const obstacle = new Obstacle(obstacleRef.current);
      const scenery = new Scenery(sceneryRef.current);
      const game = new Game(avatar, obstacle, scenery, setStatusGame, () =>
        dispatch(counterActions.increment())
      );

      window.addEventListener("keydown", (event) => {
        avatar.jump();
      });
      setGame(game);
    }
  }, [avatarRef, dispatch]);

  return (
    <div
      className="game-board-content"
      onContextMenu={(e) => e.preventDefault()}
      onTouchStart={(e) => {
        e.preventDefault();
        game?.avatar.jump();
      }}
    >
      <GameCounterComponent />
      <div className="game-board-body">
        <SceneryComponent props={{ ref: sceneryRef }} />
        <AvatarComponent statusGame={statusGame} props={{ ref: avatarRef }} />
        <ObstacleComponent
          statusGame={statusGame}
          props={{ ref: obstacleRef }}
        />
      </div>
      <StartGameComponent
        statusGame={statusGame}
        onStartGame={startGameHandle}
      />
    </div>
  );
};
