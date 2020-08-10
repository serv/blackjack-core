export default class Bet {
  constructor(amount) {
    this.amount = amount;
  }

  setupNatural() {
    this.amount *= 1.5;
  }

  doubleDown() {
    this.amount *= 2;
  }

  setBet(amount) {
    this.amount = amount;
  }

  reset() {
    this.amount = 0;
  }
}
