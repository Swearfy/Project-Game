export class Player {
  constructor(game) {
    this.game = game;
    this.width = 50;
    this.height = 50;
    this.x = this.game.width / 2 - this.width / 2;
    this.y = this.game.height / 2 - this.height / 2;
  }
  update(input) {
    if (input.includes("d")) this.x += 1.2;
    else if (input.includes("s")) this.y += 1.2;
    else if (input.includes("a")) this.x -= 1.2;
    else if (input.includes("w")) this.y -= 1.2;
  }
  draw(context) {
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
