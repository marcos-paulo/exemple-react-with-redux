import { StatusGameType } from "../gameJumpTypes";
import { Avatar } from "./Avatar";
import { Obstacle } from "./Obstacle";

export class Game {
  private jumps = 0;
  private countedJumps = 0;

  constructor(
    public avatar: Avatar,
    public obstacle: Obstacle,
    private statusGame: (status: StatusGameType) => void,
    private callbackOnIncrementScore: () => void,
    private callbackOnFinalityGame?: () => void
  ) {
    avatar.addCallBackToJump(() => {
      this.jumps += 1;
    });
  }

  startGame() {
    this.statusGame("running");
    this.avatar.resuscitate();
    this.obstacle.startObstacle();
    const loop = setInterval(() => {
      if (this.isGameOver()) {
        this.endGameOver();
        clearInterval(loop);
      } else if (this.isManagedToJump() && this.countedJumps !== this.jumps) {
        this.callbackOnIncrementScore();
        this.countedJumps = this.jumps;
      }
    }, 10);
  }

  private isAvatarCollidedWithThePipe() {
    const avatarWidth = this.avatar.getWidthAvatar();
    const obstacleHeight = this.obstacle.getHeightObstacle();
    return (
      this.obstacle.getPositionLeft() <= avatarWidth &&
      this.obstacle.getPositionLeft() > -(avatarWidth * 0.23) &&
      this.avatar.getHeightOfJumpNow() < obstacleHeight
    );
  }

  isManagedToJump() {
    const avatarWidth = this.avatar.getWidthAvatar();
    const obstaclePositionLeft = this.obstacle.getPositionLeft();
    return obstaclePositionLeft <= -(avatarWidth * 0.23);
  }

  private isGameOver() {
    return this.isAvatarCollidedWithThePipe();
  }

  private endGameOver() {
    this.statusGame("game-over");
    if (this.callbackOnFinalityGame) this.callbackOnFinalityGame();
    this.obstacle.stopObstacle();
    this.avatar.die();
  }
}
