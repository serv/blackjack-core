import { expect } from "chai";
import Game from "../../src/game";

describe("Game", () => {
  const game = new Game();
  game.addPlayer({ name: "New Player" });

  it("has a dealer", () => {
    console.log(game.dealer);
    expect(game.dealer.constructor.name).to.eql("Dealer");
  });
  it("has players", () => {
    for (let player of game.players) {
      expect(player.constructor.name);
    }
  });
  it("has a pack", () => {
    expect(game.pack.constructor.name).to.eql("Pack");
  });
});
