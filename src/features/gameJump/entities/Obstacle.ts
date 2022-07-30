export class Obstacle {
  constructor(private _obstacleImg: HTMLImageElement) {}

  getPositionLeft() {
    return this._obstacleImg.offsetLeft;
  }

  getHeightObstacle() {
    return this._obstacleImg.offsetHeight;
  }

  blockLeftPosition() {
    const screenPosition = this.getPositionLeft();
    this._obstacleImg.style.left = `${screenPosition}px`;
  }

  unblockLeftPosition() {
    this._obstacleImg.style.removeProperty("left");
  }

  startObstacle() {
    this.unblockLeftPosition();
    this._obstacleImg.classList.add("animate-pipe");
  }

  stopObstacle() {
    this.blockLeftPosition();
    this._obstacleImg.classList.remove("animate-pipe");
  }
}
