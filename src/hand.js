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

  pop() {
    return this.cards.pop();
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

  isPair() {
    return this.cards.length === 2 && this.cards[0].name === this.cards[1].name;
  }

  isBust() {
    return this.simpleValue() > 21;
  }

  simpleValue() {
    let sum = 0;

    for (let card of this.cards) {
      sum += card.simpleValue();
    }

    if (this.hasAce() && sum + 10 < 21) {
      sum += 10;
    }

    return sum;
  }

  hasAce() {
    return this.cards.filter((card) => card.name === "A").length > 0;
  }

  canDoubleDown() {
    return (
      this.cards.length === 2 && [9, 10, 11].indexOf(this.simpleValue()) >= 0
    );
  }
}
