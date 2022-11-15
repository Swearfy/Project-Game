const canvas = document.getElementById("canvas1");

export class Enemy {
  constructor(game) {
    const radius = 30;
    let x;
    let y;
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
    }

    this.x = x;
    this.y = y;
    this.game = game;
    this.speedX = 0;
    this.speedY = 0;
    this.maxSpeed = 5;
    this.delete = false;
  }
  update(deltaTime) {
    //calc velocity to player
    const angle = Math.atan2(
      this.game.player.y - this.y,
      this.game.player.x - this.x
    );

    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
    this.x += this.speedX;
    this.y += this.speedY;
    // //enemy speed
    this.speedX = velocity.x * this.maxSpeed;
    this.speedY = velocity.y * this.maxSpeed;
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, 10, 0, Math.PI * 2, false);
    context.fillStyle = "red";
    context.fill();
  }
}

export class LowLevelEnemy extends Enemy {
  constructor(game) {
    super(game);
    this.radius = 10;
    this.lives = 2;
  }
}
