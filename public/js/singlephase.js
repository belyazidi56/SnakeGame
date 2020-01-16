import MainScene from "./MainScene.js";
const config = {
  width: 640,
  height: 640,
  type: Phaser.Auto,
  parent: "phaser-game",
  scene: [MainScene]
};

new Phaser.Game(config);
