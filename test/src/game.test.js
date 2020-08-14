import { expect } from "chai";
import Game from "../../src/game";

describe("Game", () => {
  const game = new Game();
  game.addPlayer({ name: "New Player" });

  it("has a dealer", () => {
    expect(game.dealer.constructor.name).to.eql("Dealer");
  });

  it("has players", () => {
    for (let player of game.players) {
      expect(player.constructor.name);
    }
  });

  it("has a pack", () => {
    expect(game.pack.constructor.name).to.eql("Pack");
  });

  it("has a bet", () => {
    expect(game.bet.constructor.name).to.eql("Bet");
  });

  it("has a roundManager", () => {
    expect(game.roundManager.constructor.name).to.eql("RoundManager");
  });

  it("#deal", () => {
    game.deal();

    expect(game.dealer.currentHand().cards.length).to.eql(2);

    for (let player of game.players) {
      expect(player.currentHand().cards.length).to.eql(2);
    }
  });

  it("#resetRound", () => {
    game.resetRound();

    expect(game.bet.amount).to.eql(0);
    expect(game.pack.cards.length).to.eql(52);
    expect(game.dealer.hands.length).to.eql(1);
    expect(game.dealer.currentHand().cards.length).to.eql(0);

    for (let player of game.players) {
      expect(player.hands.length).to.eql(1);
      expect(player.currentHand().cards.length).to.eql(0);
    }
  });

  describe("roundManager", () => {
    describe("round life cycle", () => {
      game.roundManager.start();

      it("should be reset", () => {
        expect(game.bet.amount).to.eql(0);
        expect(game.pack.cards.length).to.eql(52);
        expect(game.dealer.hands.length).to.eql(1);
        expect(game.dealer.currentHand().cards.length).to.eql(0);

        for (let player of game.players) {
          expect(player.hands.length).to.eql(1);
          expect(player.currentHand().cards.length).to.eql(0);
        }
      });

      it("allowableActions: bet, clear-bet, deal", () => {
        expect(game.roundManager.allowableActions).to.include.members([
          "bet",
          "clear-bet",
          "deal"
        ]);
        expect(game.roundManager.allowableActions.length).to.eql(3);
      });

      describe("bets", () => {
        // Only when bet is in the allowable action, you can bet
        it("add a bet, normal, allowableActions", () => {
          game.roundManager.setBet(100);
        });

        it("getBet", () => {
          expect(game.roundManager.getBet()).to.eql(100);
        });

        it("clearBet", () => {
          game.roundManager.clearBet();
          expect(game.roundManager.getBet()).to.eql(0);
        });
      });

      describe("deal", () => {
        const gameForDeal = new Game();
        gameForDeal.addPlayer({ name: "New Player" });

        it("can be dealt only with a bet", () => {
          expect(() => {
            gameForDeal.roundManager.deal();
          }).to.throw("need to bet first");
        });

        it("with a bet, can deal", () => {
          gameForDeal.roundManager.setBet(100);
          gameForDeal.roundManager.deal();
        });

        it("a dealer has two cards", () => {
          expect(gameForDeal.dealer.currentHand().cards.length).to.eql(2);
        });

        it("a player has two cards", () => {
          expect(gameForDeal.players[0].currentHand().cards.length).to.eql(2);
        });

        it("acceptable actions always: hit, stand", () => {
          const shoultNotHave = ["bet", "clear-bet", "deal"];
          const shouldHave = ["hit", "stand"];

          expect(gameForDeal.roundManager.allowableActions).to.not.have.members(
            shoultNotHave
          );
          expect(gameForDeal.roundManager.allowableActions).to.have.members(
            shouldHave
          );
        });
      });

      describe("hit", () => {
        const gameForHit = new Game();
        gameForHit.addPlayer({ name: "New Player" });

        it("can be hit only after being dealt", () => {
          expect(() => {
            gameForHit.roundManager.hit();
          }).to.throw("need to deal first");
        });

        it("can be hit", () => {
          gameForHit.roundManager.setBet(100);
          gameForHit.roundManager.deal();

          gameForHit.roundManager.hit();

          expect(gameForHit.players[0].currentHand().cards.length).to.eql(3);
        });
      });

      describe("stand", () => {
        const gameForStand = new Game();
        gameForStand.addPlayer({ name: "New Player" });

        it("can stand only after being dealt", () => {
          expect(() => {
            gameForStand.roundManager.stand();
          }).to.throw("need to deal first");
        });

        it("can stand", () => {
          gameForStand.roundManager.setBet(100);
          gameForStand.roundManager.deal();

          gameForStand.roundManager.stand();

          expect(gameForStand.players[0].currentHand().cards.length).to.eql(2);
        });

        it("when dealer stands, the game ends", () => {
          // TODO: Game ends
        });
      });

      describe("split", () => {});

      describe("double-down", () => {});
    });
  });
});
