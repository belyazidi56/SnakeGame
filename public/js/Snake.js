export default class Snake {
  constructor(scene) {
    this.scene = scene;
    this.lastMoveTime = 0;
    this.moveInterval = 400;
    this.tilesize = 16;
    this.direction = Phaser.Math.Vector2.RIGHT;
    this.body = [];
    this.body.push(
      this.scene.add
        .rectangle(
          this.scene.game.config.width / 2,
          this.scene.game.config.height / 2,
          this.tilesize,
          this.tilesize,
          0xff00000
        )
        .setOrigin(0)
    );
    this.apple = this.scene.add
      .rectangle(0, 0, this.tilesize, this.tilesize, 0x00ff00)
      .setOrigin(0);
    this.positionapple();
    scene.input.keyboard.on("keydown", e => {
      this.keydown(e);
    });
  }

  positionapple() {
    this.apple.x =
      Math.floor(
        (Math.random() * this.scene.game.config.width) / this.tilesize
      ) * this.tilesize;
    this.apple.y =
      Math.floor(
        (Math.random() * this.scene.game.config.height) / this.tilesize
      ) * this.tilesize;
  }
  keydown(event) {
    switch (event.keyCode) {
      case 37:
        if (this.direction != Phaser.Math.Vector2.RIGHT)
          this.direction = Phaser.Math.Vector2.LEFT;
        break;
      case 38:
        if (this.direction != Phaser.Math.Vector2.DOWN)
          this.direction = Phaser.Math.Vector2.UP;
        break;
      case 39:
        if (this.direction != Phaser.Math.Vector2.LEFT)
          this.direction = Phaser.Math.Vector2.RIGHT;
        break;
      case 40:
        if (this.direction != Phaser.Math.Vector2.UP)
          this.direction = Phaser.Math.Vector2.DOWN;
        break;
    }
  }

  update(time) {
    if (time >= this.lastMoveTime + this.moveInterval) {
      this.lastMoveTime = time;
      this.move();
    }
  }

  move() {
    let x = this.body[0].x + this.direction.x * this.tilesize;
    let y = this.body[0].y + this.direction.y * this.tilesize;
    if (this.apple.x == x && this.apple.y == y) {
      this.body.push(
        this.scene.add
          .rectangle(0, 0, this.tilesize, this.tilesize, 0x00ffff)
          .setOrigin(0)
      );
      this.positionapple();
    }
    for (let index = this.body.length - 1; index > 0; index--) {
      this.body[index].x = this.body[index - 1].x;
      this.body[index].y = this.body[index - 1].y;
    }

    this.body[0].x = x;
    this.body[0].y = y;

    //Death By Getting OFF Screen
    if (
      this.body[0].x < 0 ||
      this.body[0].x > this.scene.game.config.width ||
      this.body[0].y < 0 ||
      this.body[0].y > this.scene.game.config.height
    ) {
      this.scene.scene.restart();
    }

    //Death By Own Tail
    let tail = this.body.slice(1);
    if (
      tail.filter(s => s.x === this.body[0].x && s.y === this.body[0].y)
        .length > 0
    ) {
      this.scene.scene.restart();
    }
  }
}
