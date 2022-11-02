import { LowLevelEnemy } from "./enemy.js";
import { InputHandle } from "./imput.js";
import { Player } from "./player.js";
import { Projectile } from "./projectile.js";

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
    this.projectiles = [];
  }
  update() {
    this.player.update(this.input.keys);

    //foreach to update projectiles
    this.projectiles.forEach((projectile) => {
      projectile.update();
    });

    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.delete
    );

    //enemy
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

      this.projectiles.forEach((projectile) => {
        if (this.checkcollision(enemy, projectile) - enemy.radius < 1) {
          projectile.delete = true;
          enemy.delete = true;
          score++;
          scoreEL.innerHTML = score;
        }
      });
    });

    this.enemies = this.enemies.filter((enemie) => !enemie.delete);
  }
  draw(context) {
    this.player.draw(context);

    //draw projectiles
    this.projectiles.forEach((projectile) => {
      projectile.draw(context);
    });

    //draw enemy
    this.enemies.forEach((enemy) => {
      enemy.draw(context);
    });
  }
  shoot(mouseX, mouseY) {
    //shoot
    this.projectiles.push(
      new Projectile(this, this.player.x, this.player.y, mouseX, mouseY)
    );
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
