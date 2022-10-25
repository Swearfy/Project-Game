export class Projectile {
  constructor(game, x, y, velocity) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.maxSpeed = 1;
    this.radius = 10;
    this.velocity = velocity;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    //projectile speed
    this.speedX = this.velocity.x * this.maxSpeed;
    this.speedY = this.velocity.y * this.maxSpeed;
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, 10, 0, Math.PI * 2, false);
    context.fillStyle = "red";
    context.fill();
  }
}
