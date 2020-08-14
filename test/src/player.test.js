import { expect } from "chai";
import Player from "./../../src/player";
import Pack from "./../../src/pack";
import Card from "./../../src/card";

describe("Player", () => {
  const player = new Player();
  const pack = new Pack();
  pack.shuffle();

  it("is a player type", () => {
    expect(player.type).to.eql("player");
  });

  it("has a hand", () => {
    expect(player.hands.length).to.eql(1);
  });

  it("can take a card", () => {
    const popped = pack.pop();
    player.take(popped);

    expect(player.currentHand().cards[0]).to.eql(popped);
  });

  describe("split", () => {
    it("success with a pair", () => {
      const player2 = new Player();
      const card1 = new Card({ suite: "hearts", name: "3" });
      const card2 = new Card({ suite: "diamonds", name: "3" });
      player2.take(card1);
      player2.take(card2);

      player2.split();

      expect(player2.hands.length).to.eql(2);
    });
  });
});
