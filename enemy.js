export class BaisicEnemy {
  constructor(game, x, y, radius, color, playerX, playerY, velocity) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.playerX = playerX;
    this.playerY = playerY;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  update() {
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, 30, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
  }
}
