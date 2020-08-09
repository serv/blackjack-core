import { expect } from "chai";
import Dealer from "./../../src/dealer";
import Pack from "./../../src/pack";

describe("Dealer", () => {
  const dealer = new Dealer();
  const pack = new Pack();
  pack.shuffle();

  it("has a type of a dealer", () => {
    expect(dealer.type).to.eql("dealer");
  });

  it("has a hand", () => {
    expect(dealer.hands.length).to.eql(1);
  });

  it("#take", () => {
    const popped = pack.pop();

    dealer.take(popped);

    expect(dealer.hands[0].cards.length).to.eql(1);
  });
});
