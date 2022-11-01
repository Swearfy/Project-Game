import { LowLevelEnemy } from "./enemy.js";
import { InputHandle } from "./imput.js";
import { Player } from "./player.js";
import { Projectile } from "./projectile.js";

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
      this.projectiles = [];
    }
    update() {
      this.player.update(this.input.keys);

      //foreach to update projectiles
      this.projectiles.forEach((projectile, index) => {
        projectile.update();

        //remove projectiles if outside the canvas
        if (
          projectile.x < 0 ||
          projectile.x > this.width ||
          projectile.y < 0 ||
          projectile.y > this.height
        ) {
          setTimeout(() => {
            this.projectiles.splice(index, 1);
          }, 0);
        }
      });

      //foreach to update enemies
      this.enemies.forEach((enemy) => {
        enemy.update();
      });
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
    addEnemy() {
      //add enemies
      this.enemies.push(new LowLevelEnemy(this));
    }
    shoot(mouseX, mouseY) {
      //shoot
      this.projectiles.push(
        new Projectile(this, this.player.x, this.player.y, mouseX, mouseY)
      );
    }
  }
  const game = new Game(canvas.width, canvas.height);

  function animate() {
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
