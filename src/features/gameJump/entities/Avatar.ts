export class Avatar {
  private callbackToJump: () => void = () => {};
  constructor(private _avatar: HTMLDivElement) {}

  resuscitate() {
    this.unblockBottomPosition();
    this._avatar.classList.remove("dead");
  }

  die() {
    this.blockBottomPosition();
    this._avatar.classList.add("dead");
  }

  jump() {
    if (!this.isDead() && !this.isJumping()) {
      this._avatar?.classList.add("jump");
      console.log(window.getComputedStyle(this._avatar).animationDuration);
      this.callbackToJump();
      setTimeout(() => {
        this._avatar?.classList.remove("jump");
      }, 501);
    }
  }

  addCallBackToJump(callback: () => void) {
    this.callbackToJump = callback;
  }

  getHeightOfJumpNow() {
    return +window.getComputedStyle(this._avatar).bottom.replace("px", "");
  }

  getWidthAvatar() {
    return this._avatar.offsetWidth * 0.8;
  }

  private isJumping() {
    return this._avatar.classList.contains("jump");
  }

  private isDead() {
    return this._avatar.classList.contains("dead");
  }

  private blockBottomPosition() {
    const screenPosition = this.getHeightOfJumpNow();
    this._avatar.style.bottom = `${screenPosition}px`;
  }

  private unblockBottomPosition() {
    this._avatar.style.removeProperty("bottom");
  }
}
