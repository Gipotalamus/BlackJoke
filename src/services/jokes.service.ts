import {Http, Headers, RequestOptions} from "@angular/http";
import {Joke} from "../jokes/joke";
import 'rxjs/Rx';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {PaginationService} from "./pagination.service";

@Injectable()
export class JokeService{

  constructor(private http: Http, private paginationService: PaginationService){}

  getJokes(group: string, page: number, pageSize: number, sort: string): Observable<any>{
    return this.http.get('http://localhost:8080/jokes?filter=' + group + '&page=' + (page - 1) + '&size=' + pageSize + '&sort=' + sort)
      .map(resp => {let json = resp.json();
        this.paginationService.collectionSize = json['totalElements'];
        return json['content']} );
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
