import { expect } from "chai";
import Hand from "./../../src/hand";
import Card from "./../../src/card";

describe("Hand", () => {
  describe("#split", () => {
    const hand = new Hand({ type: "player" });

    it("success with a pair", () => {
      const card1 = new Card({ suite: "hearts", name: "10" });
      const card2 = new Card({ suite: "diamonds", name: "10" });

      hand.take(card1);
      hand.take(card2);

      const splitted = hand.split();

      expect(hand.cards.length).to.eql(1);
      expect(splitted.cards.length).to.eql(1);
    });

    it("fail with a non-pair", () => {
      const card1 = new Card({ suite: "hearts", name: "10" });
      const card2 = new Card({ suite: "diamonds", name: "9" });

      hand.take(card1);
      hand.take(card2);

      expect(() => hand.split()).to.throw("failed to split");
    });
  });
});
