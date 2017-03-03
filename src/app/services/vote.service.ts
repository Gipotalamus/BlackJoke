import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {Vote} from "../votes/vote";

@Injectable()
export class VoteService {

  constructor(private http: Http) { }

  addVote(vote: Vote): Observable<any> {
    let headers: Headers = new Headers({'Content-Type': 'application/json'});
    let ro: RequestOptions = new RequestOptions({headers: headers});
    return this.http.post('http://localhost:8080/votes/', JSON.stringify(vote), ro);
  }

}
