import Participant from "./participant";

export default class Dealer extends Participant {
  constructor() {
    super({ type: "dealer" });
  }
}
