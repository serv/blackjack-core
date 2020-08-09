import Participant from "./participant";
import Hand from "./hand";

export default class Player extends Participant {
  constructor() {
    super({ type: "player" });
    this.balance = 200;
  }

  split() {
    if (!this.currentHand().isPair()) {
      throw new Error("failed to split");
    }

    const hand = new Hand({ type: this.type });
    const popped = this.hands[this.activeHand].pop();
    hand.take(popped);

    this.hands.push(hand);
  }
}
