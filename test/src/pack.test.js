import { expect } from "chai";
import Pack from "../../src/pack";

describe("Pack", () => {
  const pack = new Pack();

  it("has 52 cards", () => {
    expect(pack.cards.length).to.eql(52);
  });

  it("#shuffle", () => {
    pack.shuffle();
    expect(pack.cards.length).to.eql(52);
  });
});
