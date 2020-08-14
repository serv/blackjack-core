import { expect } from "chai";
import Participant from "../../src/participant";
import Pack from "../../src/pack";
import Hand from "../../src/hand";
import Card from "../../src/card";

describe("Participant", () => {
  const participant = new Participant({ type: "dealer" });
  const pack = new Pack();
  pack.setupCards();

  it("has an array of hands", () => {
    expect(participant.hands).to.be.an("array");
  });

  it("take a card, when you have one hand", () => {
    const popped = pack.pop();
    participant.take(popped);
  });

  it("has an activeHand", () => {
    expect(participant.activeHand).to.eql(0);
  });

  describe("take a card, when you have two hands after you split", () => {
    const participant2 = new Participant({ type: "player" });
    const hand = new Hand({ type: "player" });
    const popped = pack.pop();

    participant2.hands.push(hand);

    it("successfully take a card", () => {
      participant2.take(popped);

      expect(participant2.hands[0].cards[0]).to.eql(popped);
    });
  });

  describe("endValue", () => {
    it("with one hand", () => {
      const part1 = new Participant({ type: "player" });
      const hand = new Hand({ type: "player" });

      const card1 = new Card({ suite: "heart", name: "4" });
      const card2 = new Card({ suite: "heart", name: "8" });

      part1.hands.push(hand);
      part1.take(card1);
      part1.take(card2);

      expect(part1.endValue()).to.eql(12);
    });

    it("with two hands", () => {
      const part1 = new Participant({ type: "player" });
      const hand1 = new Hand({ type: "player" });
      const hand2 = new Hand({ type: "player" });

      const card1 = new Card({ suite: "heart", name: "4" });
      const card2 = new Card({ suite: "heart", name: "8" });

      const card3 = new Card({ suite: "spades", name: "4" });
      const card4 = new Card({ suite: "diamonds", name: "5" });

      part1.hands.push(hand1);
      part1.take(card1);
      part1.take(card2);
      part1.setActiveHand(1);
      part1.hands.push(hand2);
      part1.take(card3);
      part1.take(card4);

      expect(part1.endValue()).to.eql(12);
    });

    it("with three hand", () => {
      const part1 = new Participant({ type: "player" });
      const hand1 = new Hand({ type: "player" });
      const hand2 = new Hand({ type: "player" });
      const hand3 = new Hand({ type: "player" });

      const card1 = new Card({ suite: "heart", name: "4" });
      const card2 = new Card({ suite: "heart", name: "8" });

      const card3 = new Card({ suite: "spades", name: "4" });
      const card4 = new Card({ suite: "diamonds", name: "5" });

      const card5 = new Card({ suite: "diamonds", name: "4" });
      const card6 = new Card({ suite: "diamonds", name: "10" });

      part1.hands.push(hand1);
      part1.take(card1);
      part1.take(card2);
      part1.setActiveHand(1);
      part1.hands.push(hand2);
      part1.take(card3);
      part1.take(card4);
      part1.setActiveHand(2);
      part1.hands.push(hand3);
      part1.take(card5);
      part1.take(card6);

      expect(part1.endValue()).to.eql(14);
    });

    it("with four hands", () => {});

    it("with an ace being 1", () => {});

    it("with an ace being 11", () => {});
  });
});
