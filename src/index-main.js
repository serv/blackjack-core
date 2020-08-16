require = require("esm")(module /*, options*/);

const Game = require("./game");

module.exports = {
  Game: Game.default
};
