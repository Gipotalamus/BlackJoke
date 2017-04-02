import {Http, Headers, RequestOptions, URLSearchParams} from "@angular/http";
import {Joke} from "../jokes/joke";
import 'rxjs/Rx';
import {Injectable, Inject} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {basePath} from "./path.config";

@Injectable()
export class JokeService {

  filter: string = '';
  page: number = 0;
  pageSize: number = 5;
  collectionSize: number = 5;
  sort: string = 'date';
  statusMessage = '';
  path: string;

  constructor(private http: Http, @Inject(basePath) private basePath: string) {
    this.path = `${basePath}jokes/`;
  }

  getJokes(): Observable<any> {
    let searchParams: URLSearchParams = new URLSearchParams();
    searchParams.append('filter', this.filter);
    searchParams.append('page', (this.page).toString());
    searchParams.append('size', this.pageSize.toString());
    searchParams.append('sort' ,this.sort);
    return this.http.get(this.path, {search: searchParams});
  }

  saveJoke(joke: Joke): Observable<any> {
    let headers: Headers = new Headers({'Content-Type': 'application/json'});
    let ro: RequestOptions = new RequestOptions({headers: headers});
    return this.http.post(this.path, JSON.stringify(joke), ro);
  }

  deleteJoke(jokeId: number): Observable<any> {
    return this.http.delete(this.path + jokeId);
  }

}
