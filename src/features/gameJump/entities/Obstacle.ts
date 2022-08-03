import { Properties } from "./Types";

export class Obstacle extends Properties {
  constructor(private obstacleImg: HTMLImageElement) {
    super(obstacleImg, "left");
  }

  startObstacle = () => this.obstacleImg.classList.add("animate-pipe");

  stopObstacle = () => this.obstacleImg.classList.remove("animate-pipe");

  setAnimateTime = (animateTime: number) =>
    this.setProperty("--obstacle-animation-duration", animateTime + "ms");
}
