import { StatusGameType } from "../../gameJumpTypes";

import avatarDeadImg from "../../assets/avatar-game-over.png";
import avatarImg from "../../assets/avatar.gif";
import avatarIdle from "../../assets/avatar-idle.png";

import "./index.scss";

interface AvatarProps {
  statusGame: StatusGameType;
  props: React.ClassAttributes<HTMLDivElement>;
}
export const AvatarComponent = ({ statusGame, props }: AvatarProps) => (
  <div {...props} className="avatar">
    {statusGame === "idle" && (
      <img className="img-idle-avatar" src={avatarIdle} alt="" />
    )}
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
);
