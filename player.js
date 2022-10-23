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
  }
  update(input) {
    this.x += this.speedX;
    this.y += this.speedY;
    if (input.includes("d")) this.speedX = this.maxSpeed;
    else if (input.includes("a")) this.speedX = -this.maxSpeed;
    else this.speedX = 0;

    if (input.includes("s")) this.speedY = this.maxSpeed;
    else if (input.includes("w")) this.speedY = -this.maxSpeed;
    else this.speedY = 0;

    if (this.x - this.radius < 0) this.x += this.radius - this.x;
    if (this.x > this.game.width - this.radius)
      this.x = this.game.width - this.radius;

    if (this.y - this.radius < 0) this.y += this.radius - this.y;
    if (this.y > this.game.height - this.radius)
      this.y = this.game.height - this.radius;

    this.projectiles.forEach((projectile) => {
      projectile.update();
    });
  }
  draw(context) {
    context.beginPath();
    context.fillStyle = "black";
    context.arc(this.x, this.y, 50, 0, Math.PI * 2, false);
    context.fill();
    this.projectiles.forEach((projectile) => {
      projectile.draw(context);
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
}
