export class Player {
  constructor(game) {
    this.game = game;
    this.width = 50;
    this.height = 50;
    this.x = this.game.width / 2 - this.width / 2;
    this.y = this.game.height / 2 - this.height / 2;
    this.speedX = 0;
    this.speedY = 0;
    this.maxSpeed = 2;
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

    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;

    if (this.y < 0) this.y = 0;
    if (this.y > this.game.height - this.height)
      this.y = this.game.height - this.height;
  }
  draw(context) {
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
