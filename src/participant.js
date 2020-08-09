import Hand from "./hand";

export default class Participant {
  constructor({ type }) {
    this.type = type;
    this.hands = [];
    this.setupHand();
  }

  setupHand() {
    const hand = new Hand({ type: this.type });
    this.hands.push(hand);
  }

  take(card, index) {
    if (index === null || index === undefined) {
      if (this.hands.length !== 1) {
        throw new Error("failed to take a card");
      }

      index = 0;
    }

    this.hands[index].take(card);
  }
}
