import Dealer from "./dealer";
import Player from "./player";
import Pack from "./pack";
import Bet from "./bet";

export default class Game {
  constructor() {
    this.dealer = new Dealer();
    this.players = [];
    this.bet = new Bet(0);
    this.pack = new Pack();
    this.pack.shuffle();
  }

  addPlayer() {
    this.players.push(new Player());
  }

  deal() {
    this.dealCard(this.dealer);
    this.dealCard(this.dealer);
    for (let player of this.players) {
      this.dealCard(player);
      this.dealCard(player);
    }
  }

  dealCard(participant) {
    const popped = this.pack.pop();

    participant.take(popped);
  }

  resetRound() {
    this.bet.reset();
    this.pack = new Pack();
    this.pack.shuffle();

    this.dealer.resetHand();

    for (let p of this.players) {
      p.resetHand();
    }
  }
}
