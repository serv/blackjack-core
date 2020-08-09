import { expect } from "chai";
import Player from "./../../src/player";

describe("Player", () => {
  const player = new Player();

  it("is a player type", () => {
    expect(player.type).to.eql("player");
  });

  it("has a hand", () => {
    expect(player.hands.length).to.eql(1);
  });
});
