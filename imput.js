export class InputHandle {
  constructor(game) {
    this.game = game;
    this.keys = [];
    this.clickX = 0;
    this.clickY = 0;
    window.addEventListener("keydown", (e) => {
      if (
        (e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d") &&
        this.keys.indexOf(e.key) === -1
      ) {
        this.keys.push(e.key);
      }
      console.log(e.key, this.keys);
    });

    window.addEventListener("keyup", (e) => {
      console.log(e.key, this.keys);
      if (e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d") {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
      console.log(e.key, this.keys);
    });

    window.addEventListener("click", (e) => {
      this.clickX = e.clientX;
      this.clickY = e.clientY;
      this.game.player.shoot(this.clickX, this.clickY);
    });
  }
}
