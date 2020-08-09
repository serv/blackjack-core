export default class Game {
  constructor() {
    this.dealer = new Dealer();
    this.players = [];
  }

  addPlayer({ name }) {
    this.players.push(new Player({ name }));
  }
}
