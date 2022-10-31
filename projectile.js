export class Projectile {
  constructor(game, x, y, mouseX, mouseY) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.mouseX = mouseX;
    this.mouseY = mouseY;
    this.speedX = 0;
    this.speedY = 0;
    this.maxSpeed = 2;
    const angle = Math.atan2(this.mouseY - this.y, this.mouseX - this.x);
    const velocity = {
      x: Math.cos(angle) * 4,
      y: Math.sin(angle) * 4,
    };
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
    context.fillStyle = "red";
    context.arc(this.x, this.y, 10, 0, Math.PI * 2, false);
    context.fill();
  }
}
