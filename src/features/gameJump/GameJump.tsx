import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import avatarDeadImg from "./assets/avatar-game-over.png";
import avatarImg from "./assets/avatar.gif";
import cloudsImg from "./assets/clouds.png";
import pipeImg from "./assets/pipe.png";
import { Counter } from "../counter/Counter";
import { counterActions } from "../counter/counterSlice";
import { Avatar } from "./entities/Avatar";
import { Game } from "./entities/Game";
import { Obstacle } from "./entities/Obstacle";
import "./GameJump.scss";
import { StatusGameType } from "./gameJumpTypes";

export const GameJump = () => {
  const dispatch = useAppDispatch();
  const element = window;
  const avatarRef = useRef<HTMLDivElement>(null);
  const pipeRef = useRef<HTMLImageElement>(null);

  const [statusGame, setStatusGame] = useState<StatusGameType>("running");
  const [game, setGame] = useState<Game>();

  useEffect(() => {
    if (avatarRef.current && pipeRef.current) {
      const avatar = new Avatar(avatarRef.current);
      const obstacle = new Obstacle(pipeRef.current);
      const game = new Game(avatar, obstacle, setStatusGame, () =>
        dispatch(counterActions.increment())
      );
      game.startGame();
      element.addEventListener("keydown", (event) => {
        avatar.jump();
      });
      element.addEventListener("touchstart", (event) => {
        avatar.jump();
      });
      setGame(game);
    }
  }, [avatarRef, element, dispatch]);

  return (
    <div className="game-board-content">
      <div className="game-board-header">
        <Counter />
      </div>
      <div className="game-board-body">
        <img className="clouds animate-clouds" src={cloudsImg} alt="" />
        <div ref={avatarRef} className="avatar">
          {statusGame === "running" && (
            <img className="img-live-avatar" src={avatarImg} alt="" />
          )}
          {statusGame === "game-over" && (
            <img className="img-dead-avatar" src={avatarDeadImg} alt="" />
          )}
          {statusGame === "winning-game" && (
            <img className="img-live-avatar" src={avatarImg} alt="" />
          )}
        </div>
        <img
          ref={pipeRef}
          className={"pipe " + (statusGame === "running" && "animate-pipe")}
          src={pipeImg}
          alt=""
        />
      </div>
      {statusGame !== "running" && (
        <div className="game-start-panel">
          <button
            onClick={(event) => {
              dispatch(counterActions.reset());
              game?.startGame();
            }}
          >
            Start new Game
          </button>
        </div>
      )}
    </div>
  );
};
