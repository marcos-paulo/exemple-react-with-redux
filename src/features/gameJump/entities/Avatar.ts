import { Properties } from "./Types";

export class Avatar extends Properties {
  private jumpTime: number = 500;
  private callbackToJump: () => void = () => {};

  constructor(private avatar: HTMLDivElement) {
    super(avatar, "bottom");
  }

  resuscitate() {
    this.avatar.classList.remove("dead");
  }

  toDie() {
    this.avatar.classList.add("dead");
  }

  jump() {
    if (!this.isDead() && !this.isJumped()) {
      this.avatar?.classList.add("jump");
      const t = Date.now();
      this.callbackToJump();
      setTimeout(() => {
        this.avatar?.classList.remove("jump");
        console.log("log", Date.now() - t);
      }, this.jumpTime);
    }
  }

  /** the higher the value, the longer the jump time will be */
  setJumpTime(jumpTime: number) {
    this.jumpTime = jumpTime;
    this.setProperty("--avatar-jump-animate-duration", jumpTime + "ms");
  }

  /** maximum height the character will go to during the jump */
  setMaxBottom(maxBottom: number) {
    this.setProperty("--avatar-animate-max-bottom", maxBottom + "px");
  }

  addToJumpCallback(callback: () => void) {
    this.callbackToJump = callback;
  }

  private isJumped() {
    return this.avatar.classList.contains("jump");
  }

  private isDead() {
    return this.avatar.classList.contains("dead");
  }

  // lockPosition = () => {
  //   this.avatar.style.bottom = `${this.getBottom()}px`;
  // };

  // unlockPosition = () => {
  //   this.avatar.style.removeProperty("bottom");
  // };
}
