import { LowLevelEnemy } from "./enemy.js";
import { InputHandle } from "./imput.js";
import { Player } from "./player.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");

  canvas.width = 1000;
  canvas.height = 1000;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this);
      this.input = new InputHandle(this);
      this.enemies = [];
    }
    update() {
      this.player.update(this.input.keys);
      //foreach to update enemies
      this.enemies.forEach((enemy) => {
        enemy.update();
      });
    }
    draw(context) {
      this.player.draw(context);
      //
      this.enemies.forEach((enemy) => {
        enemy.draw(context);
      });
    }
    addEnemy() {
      this.enemies.push(new LowLevelEnemy(this));
    }
  }
  const game = new Game(canvas.width, canvas.height);

  function animate() {
    game.enemies.forEach((enemy) => {
      enemy.update();
    });
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  setInterval(() => {
    game.addEnemy();
  }, 1000);
  animate();
});
