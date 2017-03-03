import {Http, Headers, RequestOptions, URLSearchParams} from "@angular/http";
import {Joke} from "../jokes/joke";
import 'rxjs/Rx';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";

@Injectable()
export class JokeService {

  filter: string = '';
  page: number = 0;
  pageSize: number = 5;
  collectionSize: number = 10;
  sort: string = 'date';
  statusMessage = '';

  constructor(private http: Http) {
  }

  getJokes(): Observable<any> {
    let searchParams: URLSearchParams = new URLSearchParams();
    searchParams.append('filter', this.filter);
    searchParams.append('page', (this.page).toString());
    searchParams.append('size', this.pageSize.toString());
    searchParams.append('sort' ,this.sort);
    return this.http.get('http://localhost:8080/jokes', {search: searchParams})      ;
  }

  saveJoke(joke: Joke): Observable<any> {
    let headers: Headers = new Headers({'Content-Type': 'application/json'});
    let ro: RequestOptions = new RequestOptions({headers: headers});
    return this.http.post('http://localhost:8080/jokes/', JSON.stringify(joke), ro);
  }

  deleteJoke(jokeId: number): Observable<any> {
    return this.http.delete('http://localhost:8080/jokes/' + jokeId);
  }

}
