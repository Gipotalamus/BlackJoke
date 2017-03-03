import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import {JokesGroup} from "../jokes-groups/jokes-groups";
import 'rxjs/Rx';
import {Observable} from "rxjs";

@Injectable()
export class JokesGroupsService {



  constructor(private http: Http) {
  }

  getJokesGroups(): any {
    return this.http.get('http://localhost:8080/groups/').map(resp => resp.json());
  }

  saveJokesGroup(jokesGroup: JokesGroup): Observable<any> {
    let headers: Headers = new Headers({'Content-Type': 'application/json'});
    let ro: RequestOptions = new RequestOptions({headers: headers})
    return this.http.post('http://localhost:8080/groups/', JSON.stringify(jokesGroup), ro);
  }

  deleteJokesGroup(jokesGroupId: number): Observable<any> {
    return this.http.delete('http://localhost:8080/groups/' + jokesGroupId);
  }

}
