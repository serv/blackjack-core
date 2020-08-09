export default class Hand {
  constructor({ type }) {
    this.type = type;
    this.cards = [];
  }

  isDealer() {
    return this.type === "dealer";
  }

  isPlayer() {
    return this.type === "player";
  }

  take(card) {
    this.cards.push(card);
  }

  split() {
    if (
      !(
        this.type === "player" &&
        this.cards.length === 2 &&
        this.cards[0].name === this.cards[1].name
      )
    ) {
      throw new Error("failed to split");
    }

    const popped = this.cards.pop();

    const splitted = new Hand({ type: "player" });
    splitted.take(popped);

    return splitted;
  }
}
