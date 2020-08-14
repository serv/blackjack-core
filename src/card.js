export default class Card {
  constructor({ suite, name }) {
    this.suite = suite;
    this.name = name;
    this.value = 0;
    this.setupValue();
  }

  setupValue() {
    switch (this.name) {
      case "A":
        this.value = 1;
        break;
      case "J":
      case "Q":
      case "K":
        this.value = 10;
        break;
      default:
        this.value = parseInt(this.name);
    }
  }

  simpleValue() {
    return this.value;
  }
}
