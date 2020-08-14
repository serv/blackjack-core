export default class RoundManager {
  constructor(parent) {
    this.parent = parent;
    this.currentActor = "player";
    this.allowableActions = [];
  }

  getBet() {
    return this.parent.bet.amount;
  }

  // Assume 1 player
  setBet(amount) {
    this.parent.players[0].makeBet(amount);
    this.parent.bet.setBet(amount);
  }

  clearBet() {
    const currentBet = this.getBet();
    this.parent.players[0].returnBet(currentBet);
    this.parent.bet.reset();
  }

  start() {
    this.parent.resetRound();

    return this.evalAlloableActions();
  }

  deal() {
    if (this.parent.bet.amount === 0) {
      throw new Error("need to bet first");
    }

    this.parent.deal();

    this.resetAllowableActions();
    this.evalAlloableActions();
  }

  hit() {
    if (this.allowableActions.indexOf("hit") < 0) {
      throw new Error("need to deal first");
    }

    if (this.currentActor === "player") {
      this.parent.dealCard(this.parent.players[0]);
    } else {
      this.parent.dealCard(this.parent.dealer);
    }
  }

  resetAllowableActions() {
    this.allowableActions = [];
  }

  evalAlloableActions() {
    this.resetAllowableActions();
    const currentPlayer = this.parent.players[0];

    // take bet
    if (this.parent.bet.amount === 0) {
      this.allowableActions.push("bet");
      this.allowableActions.push("clear-bet");
      this.allowableActions.push("deal");
      return;
    }

    // right at start
    if (
      currentPlayer.hands.length === 1 &&
      currentPlayer.currentHand().cards.length === 2
    ) {
      if (currentPlayer.currentHand().isPair()) {
        this.allowableActions.push("split");
      }

      if (currentPlayer.currentHand().canDoubleDown()) {
        this.allowableActions.push("double-down");
      }
    }

    if (currentPlayer.currentHand().isBust()) {
      if (currentPlayer.hands.length === 1) {
        this.allowableActions.push("bust");
        return;
      } else if (currentPlayer.activeHand < currentPlayer.hands.length) {
        currentPlayer.switchCurrentHand();
      }
    }

    this.allowableActions.push("hit");
    this.allowableActions.push("stand");
  }
}
