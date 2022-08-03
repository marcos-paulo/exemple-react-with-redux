export abstract class Properties {
  constructor(
    private element: HTMLElement,
    protected lockProperty: "left" | "right" | "bottom"
  ) {}

  getLeft = () => this.element.offsetLeft;

  getRight = () => +this.computedStyle().right.replace("px", "");

  getBottom = () => +this.computedStyle().bottom.replace("px", "");

  getWidth = () => this.element.offsetWidth;

  getHeight = () => this.element.offsetHeight;

  private computedStyle = () => window.getComputedStyle(this.element);

  protected setProperty = (property: string, value: string) =>
    this.element.style.setProperty(property, value);

  private methodName = () =>
    "get" + this.lockProperty[0].toUpperCase() + this.lockProperty.slice(1);

  lockPosition = () =>
    this.setProperty(
      this.lockProperty,
      (this as any)[this.methodName()]() + "px"
    );

  unlockPosition = () => this.element.style.removeProperty(this.lockProperty);
}
