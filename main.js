import { LowLevelEnemy } from "./enemy.js";
import { InputHandle } from "./input.js";
import { Player } from "./player.js";
import { Projectile } from "./projectile.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  const scoreEL = document.getElementById("scoreEL");

  canvas.width = 1000;
  canvas.height = 1000;
  let score = 0;
  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this);
      this.input = new InputHandle(this);
      this.enemies = [];
      this.projectiles = [];
      this.gameOver = false;
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
    }
    update(deltaTime) {
      this.player.update(this.input.keys, deltaTime);

      //foreach to update projectiles
      this.projectiles.forEach((projectile) => {
        projectile.update();
      });

      this.projectiles = this.projectiles.filter(
        (projectile) => !projectile.delete
      );

      //enemy
      this.enemies.forEach((enemy) => {
        enemy.update(deltaTime);
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

      if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
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

  let lastTime = 0;
  function animate(timeStamp) {
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
});
