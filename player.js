import { BaisicEnemy } from "./enemy.js";
import { Projectile } from "./projectile.js";

export class Player {
  constructor(game) {
    this.game = game;
    this.radius = 50;
    this.x = this.game.width / 2;
    this.y = this.game.height / 2;
    this.speedX = 0;
    this.speedY = 0;
    this.maxSpeed = 2;
    this.projectiles = [];
    this.enemies = [];
  }
  update(input) {
    this.x += this.speedX;
    this.y += this.speedY;

    // movment
    if (input.includes("d")) this.speedX = this.maxSpeed;
    else if (input.includes("a")) this.speedX = -this.maxSpeed;
    else this.speedX = 0;

    if (input.includes("s")) this.speedY = this.maxSpeed;
    else if (input.includes("w")) this.speedY = -this.maxSpeed;
    else this.speedY = 0;

    //out of bounds check on x axies
    if (this.x - this.radius < 0) this.x += this.radius - this.x;
    if (this.x > this.game.width - this.radius)
      this.x = this.game.width - this.radius;

    //out of bounds check on y axies
    if (this.y - this.radius < 0) this.y += this.radius - this.y;
    if (this.y > this.game.height - this.radius)
      this.y = this.game.height - this.radius;

    //foreach to update projectiles
    this.projectiles.forEach((projectile) => {
      projectile.update();
    });

    //foreach to update enemies
    this.enemies.forEach((enemy) => {
      enemy.update();
    });
  }
  draw(context) {
    //temp player
    context.beginPath();
    context.fillStyle = "black";
    context.arc(this.x, this.y, 50, 0, Math.PI * 2, false);
    context.fill();

    //foreach to draw projectiles
    this.projectiles.forEach((projectile, index) => {
      projectile.draw(context);

      //remove projectiles if outside the canvas
      if (
        projectile.x + projectile.radius < 0 ||
        projectile.x - projectile.radius > this.game.width ||
        projectile.y + projectile.radius < 0 ||
        projectile.y - projectile.radius > this.game.height
      ) {
        setTimeout(() => {
          this.projectiles.splice(index, 1);
        }, 0);
      }
      console.log(this.projectiles);
    });
    this.enemies.forEach((enemy) => {
      enemy.draw(context);
    });
  }
  shoot(x, y) {
    const angle = Math.atan2(y - this.y, x - this.x);
    const velocity = {
      x: Math.cos(angle) * 4,
      y: Math.sin(angle) * 4,
    };
    this.projectiles.push(new Projectile(this.game, this.x, this.y, velocity));
  }
  spawnEnemies() {
    setInterval(() => {
      const radius = 30;

      let x;
      let y;

      if (Math.random() < 0.5) {
        x = Math.random() < 0.5 ? 0 - radius : this.game.width + radius;
        y = Math.random() * this.game.height;
      } else {
        x = Math.random() * this.game.width;
        y = Math.random() < 0.5 ? 0 - radius : this.game.height + radius;
      }

      const color = "green";
      const angle = Math.atan2(this.y - y, this.x - x);

      const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle),
      };

      this.enemies.push(
        new BaisicEnemy(
          this.game,
          x,
          y,
          radius,
          color,
          this.x,
          this.y,
          velocity
        )
      );
    }, 1000);
  }
}
