import Dealer from "./dealer";
import Player from "./player";
import Pack from "./pack";

export default class Game {
  constructor() {
    this.dealer = new Dealer();
    this.players = [];
    this.pack = new Pack();
    this.pack.shuffle();
  }

  addPlayer() {
    this.players.push(new Player());
  }
}
