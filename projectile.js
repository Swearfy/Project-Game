export class Projectile {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.maxSpeed = 1;
    this.radius = 10;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    const angle = Math.atan2(
      this.y - this.game.player.shoot.y,
      this.x - this.game.player.shoot.x
    );
    const velocity = {
      x: Math.cos(angle) * 4,
      y: Math.sin(angle) * 4,
    };
    //projectile speed
    this.speedX = velocity * this.maxSpeed;
    this.speedY = velocity * this.maxSpeed;
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, 10, 0, Math.PI * 2, false);
    context.fillStyle = "red";
    context.fill();
  }
}
