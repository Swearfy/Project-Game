export class Projectile {
  constructor(game, x, y, velocity) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 5;
    this.height = 5;
    this.speed = 3;
    // this.radius = 10;
    // this.color = "red";
    this.velocity = velocity;
  }
  update() {
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, 10, 0, Math.PI * 2, false);
    context.fillStyle = "red";
    context.fill();
  }
}
