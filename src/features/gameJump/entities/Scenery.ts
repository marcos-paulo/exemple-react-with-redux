import { Properties } from "./Types";

export class Scenery extends Properties {
  constructor(private scenery: HTMLImageElement) {
    super(scenery, "right");
  }

  lockAnimation() {
    this.scenery.classList.remove("animate-clouds");
  }

  unlockAnimation() {
    this.scenery.classList.add("animate-clouds");
  }
}
