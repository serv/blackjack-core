import { expect } from "chai";
import Game from "../../src/game";

describe("Game", () => {
  const game = new Game();
  game.addPlayer({ name: "New Player" });

  it("has a dealer", () => {
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

  it("#deal", () => {
    game.deal();

    expect(game.dealer.currentHand().cards.length).to.eql(2);

    for (let player of game.players) {
      expect(player.currentHand().cards.length).to.eql(2);
    }
  });
});
