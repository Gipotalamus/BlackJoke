import {Injectable} from "@angular/core";
import {Joke} from "../jokes/joke";
import {JokesGroup} from "../jokes-groups/jokes-groups";
import {User} from "../user/user";
import {Observable} from "rxjs";
@Injectable()
export class FakeJokeService {

  jokes: Joke[] = [];

  constructor() {
    for (let i = 0; i < 4; i++) {
      this.jokes.push(new Joke(i, i + ' joke content', new JokesGroup(0, 'some group'), new Date(), new User(0, 'vasya', 'admin', false), i));
    }

  }

  getJokes(group: string, page: number, pageSize: number, sort: string): Observable<any> {
    return new Observable(observer => {
      observer.next(this.jokes);
    });
  }

  saveJoke(joke: Joke): Observable<any> {
    return new Observable(observer => {
      this.jokes.push(joke);
      observer.next(this.jokes);
    });
  }

  deleteJoke(jokeId: number): Observable<any> {
    return new Observable(observer => {
      this.jokes.splice(jokeId, 1);
      observer.next(this.jokes);
    });
  }

}
