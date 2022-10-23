const canvas = document.getElementById("canvas1");
export class InputHandle {
  constructor(game) {
    this.game = game;
    this.keys = [];
    this.clickX = 0;
    this.clickY = 0;
    window.addEventListener("keydown", (e) => {
      if (
        (e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d") &&
        this.keys.indexOf(e.key) === -1
      ) {
        this.keys.push(e.key);
      }
      console.log(e.key, this.keys);
    });

    window.addEventListener("keyup", (e) => {
      console.log(e.key, this.keys);
      if (e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d") {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
      console.log(e.key, this.keys);
    });

    // get the accourate mouse position based on canvas coordinates
    function getMousePos(canvas, evt) {
      var rect = canvas.getBoundingClientRect();
      return {
        x:
          ((evt.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
        y:
          ((evt.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
      };
    }
    window.addEventListener("click", (e) => {
      getMousePos(canvas, e);
      this.clickX = getMousePos(canvas, e).x;
      this.clickY = getMousePos(canvas, e).y;
      this.game.player.shoot(this.clickX, this.clickY);
    });
  }
}
