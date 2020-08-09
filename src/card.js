export default class Card {
  constructor({ suite, name }) {
    this.suite = suite;
    this.name = name;
    this.values = [];
    this.setupValue();
  }

  setupValue() {
    switch (this.name) {
      case "A":
        this.values = [1, 11];
        break;
      case "J":
      case "Q":
      case "K":
        this.values = [10];
        break;
      default:
        this.values = [parseInt(this.name)];
    }
  }
}
