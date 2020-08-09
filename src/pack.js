import Card from "./card";

const names = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K"
];
const suites = ["diamonds", "hearts", "clubs", "spades"];

export default class Pack {
  constructor() {
    this.cards = [];
    this.setupCards();
  }

  // https://stackoverflow.com/a/6274398/536890
  shuffle() {
    let counter = this.cards.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = this.cards[counter];
      this.cards[counter] = this.cards[index];
      this.cards[index] = temp;
    }
  }

  setupCards() {
    for (let suite of suites) {
      for (let name of names) {
        this.cards.push(new Card({ suite, name }));
      }
    }
  }
}
