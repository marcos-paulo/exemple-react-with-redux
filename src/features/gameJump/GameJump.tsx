import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import avatarDeadImg from "../../common/assets/gameJump/avatar-game-over.png";
import avatarImg from "../../common/assets/gameJump/avatar.gif";
import clouds from "../../common/assets/gameJump/clouds.png";
import pipeImg from "../../common/assets/gameJump/pipe.png";
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
  const marioRef = useRef<HTMLDivElement>(null);
  const pipeRef = useRef<HTMLImageElement>(null);

  const [statusGame, setStatusGame] = useState<StatusGameType>("running");
  const [game, setGame] = useState<Game>();

  useEffect(() => {
    if (marioRef.current && pipeRef.current) {
      const avatar = new Avatar(marioRef.current);
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
  }, [marioRef, element, dispatch]);

  return (
    <div className="game-board-content">
      <div className="game-board-header">
        <Counter />
      </div>
      <div className="game-board-body">
        <img className="clouds animate-clouds" src={clouds} alt="" />
        <div ref={marioRef} className="avatar">
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
