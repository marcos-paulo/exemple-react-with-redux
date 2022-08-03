import { StatusGameType } from "../gameJumpTypes";
import { Avatar } from "./Avatar";
import { Obstacle } from "./Obstacle";
import { Scenery } from "./Scenery";

export class Game {
  private jumps = 0;
  private countedJumps = 0;

  constructor(
    public avatar: Avatar,
    public obstacle: Obstacle,
    public scenery: Scenery,
    private setStatusGameCallback: (status: StatusGameType) => void,
    private incrementScoreCallback: () => void,
    private finalityGameCallback?: () => void
  ) {
    avatar.addToJumpCallback(() => {
      this.jumps += 1;
    });
    avatar.setJumpTime(500);

    obstacle.setAnimateTime(1500);
  }

  startGame() {
    this.jumps = 0;
    this.countedJumps = 0;
    this.setStatusGameCallback("running");

    this.avatar.resuscitate();
    this.avatar.unlockPosition();

    this.obstacle.startObstacle();
    this.obstacle.unlockPosition();

    this.scenery.unlockAnimation();
    this.scenery.unlockPosition();

    const loop = setInterval(() => {
      if (this.isCollided()) {
        this.gameOver();
        clearInterval(loop);
      } else if (this.isValidJump()) {
        this.incrementScoreCallback();
        this.countedJumps = this.jumps;
      }
    }, 10);
  }

  private isOvercomingTheObstacle = () =>
    this.avatar.getLeft() + this.avatar.getWidth() >= this.obstacle.getLeft();

  private isJumping = () => this.avatar.getBottom() > this.obstacle.getHeight();

  private isJumpedOverAnObstacle = () =>
    this.avatar.getRight() + this.avatar.getWidth() < this.obstacle.getRight();

  private isCollided = () =>
    this.isOvercomingTheObstacle() &&
    !this.isJumping() &&
    !this.isJumpedOverAnObstacle();

  private isValidJump() {
    // isso só da certo por que o pipe ja tem passado da margem o que faz com que seja falso
    return this.isJumpedOverAnObstacle() && this.countedJumps !== this.jumps;
  }

  private gameOver() {
    this.setStatusGameCallback("game-over");
    if (this.finalityGameCallback) this.finalityGameCallback();

    this.obstacle.lockPosition();
    this.obstacle.stopObstacle();

    this.avatar.lockPosition();
    this.avatar.toDie();

    this.scenery.lockPosition();
    this.scenery.lockAnimation();
  }
}
