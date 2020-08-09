import { expect } from "chai";
import Participant from "../../src/participant";
import Pack from "../../src/pack";
import Hand from "../../src/hand";

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
});
