import pipeImg from "../../assets/obstacle.png";
import { StatusGameType } from "../../gameJumpTypes";

import "./index.scss";

interface ObstacleProps {
  statusGame: StatusGameType;
  props: React.ClassAttributes<HTMLImageElement>;
}
export const ObstacleComponent = (obstacleProps: ObstacleProps) => {
  return (
    <img
      {...obstacleProps.props}
      className={
        "obstacle " +
        (obstacleProps.statusGame === "running" && "animation-obstacle")
      }
      src={pipeImg}
      alt=""
    />
  );
};
