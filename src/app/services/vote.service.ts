import {Injectable, Inject} from '@angular/core';
import {Http, RequestOptions, Headers, URLSearchParams, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Vote} from "../votes/vote";
import {User} from "../user/user";
import {basePath} from "./path.config";

@Injectable()
export class VoteService {
  ro: RequestOptions;
  headers: Headers;
  path: string;

  constructor(private http: Http,  @Inject(basePath) private basePath: string) {
    this.path = `${basePath}votes`;
    this.headers = new Headers({'Content-Type': 'application/json'});
    this.ro = new RequestOptions({headers: this.headers})
  }

  addVote(vote: Vote): Observable<Vote> {
    return this.http.post(this.path, JSON.stringify(vote), this.ro).map(resp => resp.json()).catch((err: Response) => Observable.throw(err.status));
  }

  getVotes(user: User): Observable<Vote[]> {
    let urlSearchParams = new URLSearchParams('user=' + user.name);
    let options = new RequestOptions({search: urlSearchParams});
    return this.http.get(this.path, options).map(resp => resp.json()).catch((err: Response) => Observable.throw(err.status));
  }
}
