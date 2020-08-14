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

  describe("hasAce", () => {
    it("true case", () => {
      const testHand = new Hand({ type: "player" });
      const card1 = new Card({ suite: "hearts", name: "A" });
      const card2 = new Card({ suite: "diamonds", name: "2" });

      testHand.take(card1);
      testHand.take(card2);

      expect(testHand.hasAce()).to.be.true;
    });

    it("false case", () => {
      const testHand = new Hand({ type: "player" });
      const card1 = new Card({ suite: "hearts", name: "8" });
      const card2 = new Card({ suite: "diamonds", name: "2" });

      testHand.take(card1);
      testHand.take(card2);

      expect(testHand.hasAce()).to.be.false;
    });
  });

  describe("simpleHand", () => {
    it("regular case", () => {
      const testHand = new Hand({ type: "player" });
      const card1 = new Card({ suite: "hearts", name: "8" });
      const card2 = new Card({ suite: "diamonds", name: "2" });

      testHand.take(card1);
      testHand.take(card2);

      expect(testHand.simpleValue()).to.be.eql(10);
    });

    it("with an ace acting as 11", () => {
      const testHand = new Hand({ type: "player" });
      const card1 = new Card({ suite: "hearts", name: "5" });
      const card2 = new Card({ suite: "diamonds", name: "A" });

      testHand.take(card1);
      testHand.take(card2);

      expect(testHand.simpleValue()).to.be.eql(11 + 5);
    });

    it("with an ace acting as 1", () => {
      const testHand = new Hand({ type: "player" });
      const card1 = new Card({ suite: "hearts", name: "10" });
      const card2 = new Card({ suite: "hearts", name: "8" });
      const card3 = new Card({ suite: "diamonds", name: "A" });

      testHand.take(card1);
      testHand.take(card2);
      testHand.take(card3);

      expect(testHand.simpleValue()).to.be.eql(10 + 8 + 1);
    });
  });
});
