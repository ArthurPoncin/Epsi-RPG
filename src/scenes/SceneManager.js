export class SceneManager {
  constructor() {
    this.stack = [];
  }
  get current() {
    return this.stack[this.stack.length - 1];
  }
  push(scene) {
    this.stack.push(scene);
    scene.init?.();
  }
  pop() {
    const s = this.stack.pop();
    s?.dispose?.();
  }
  replace(scene) {
    this.pop();
    this.push(scene);
  }
  update(dt) {
    this.current?.update?.(dt);
  }
}
