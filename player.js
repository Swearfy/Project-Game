export class Player {
  constructor(game) {
    this.game = game;
    this.radius = 30;
    this.x = this.game.width / 2;
    this.y = this.game.height / 2;
    this.speedX = 0;
    this.speedY = 0;
    this.maxSpeed = 2;
    this.lives = 5;
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
  }
  draw(context) {
    //temporary player
    context.beginPath();
    context.fillStyle = "black";
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fill();
  }
}
