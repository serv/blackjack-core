import Participant from "./participant";

export default class Player extends Participant {
  constructor() {
    super({ type: "player" });
  }
}
