import {Joke} from "../jokes/joke";
export class Vote{
  voteValue: number;
  joke: Joke;
  constructor(joke: Joke, voteValue: number) {
    this.joke = joke;
    this.voteValue = voteValue;
  }
}
