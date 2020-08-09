import Hand from "./hand";

export default class Participant {
  constructor({ type }) {
    this.type = type;
    this.hands = [];
    this.activeHand = 0;
    this.setupHand();
  }

  setupHand() {
    const hand = new Hand({ type: this.type });
    this.hands.push(hand);
  }

  take(card) {
    this.hands[this.activeHand].take(card);
  }

  currentHand() {
    return this.hands[this.activeHand];
  }
}
