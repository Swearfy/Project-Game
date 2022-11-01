import { LowLevelEnemy } from "./enemy.js";
import { InputHandle } from "./imput.js";
import { Player } from "./player.js";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const scoreEL = document.getElementById("scoreEL");

canvas.width = 1000;
canvas.height = 1000;
let animationID;
let score = 0;
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

    this.enemies.forEach((enemy) => {
      enemy.update();
      if (
        this.checkcollision(this.player, enemy) -
          this.player.radius -
          enemy.radius <
        1
      ) {
        enemy.delete = true;
      }
    });

    this.enemies = this.enemies.filter((enemie) => !enemie.delete);
  }
  draw(context) {
    this.player.draw(context);

    //draw enemy
    this.enemies.forEach((enemy) => {
      enemy.draw(context);
    });
  }
  addEnemy() {
    //add enemies
    this.enemies.push(new LowLevelEnemy(this));
  }
  checkcollision(player, enemy) {
    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
    return dist;
  }
}
const game = new Game(canvas.width, canvas.height);

function animate() {
  animationID = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.update();
  game.draw(ctx);
}
setInterval(() => {
  game.addEnemy();
}, 1000);
animate();
