import {Joke} from "../jokes/joke";
import {User} from "../user/user";
export class Vote{
  id: number;
  voteValue: number;
  joke: Joke;
  jokeUser: User;
  constructor(id: number, joke: Joke, voteValue: number, user: User) {
    this.id = id;
    this.joke = joke;
    this.voteValue = voteValue;
    this.jokeUser = user;
  }
}
