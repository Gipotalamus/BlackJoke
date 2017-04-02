import {Injectable, Inject} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import {JokesGroup} from "../jokes-groups/jokes-groups";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import {basePath} from "./path.config";

@Injectable()
export class JokesGroupsService {

  path: string;

  constructor(private http: Http, @Inject(basePath) private basePath: string) {
    this.path = `${basePath}groups`;
  }

  getJokesGroups(): any {
    return this.http.get(this.path).map(resp => resp.json()).catch((err: Response) => Observable.throw(err.status));
  }

  saveJokesGroup(jokesGroup: JokesGroup): Observable<JokesGroup> {
    let headers: Headers = new Headers({'Content-Type': 'application/json'});
    let ro: RequestOptions = new RequestOptions({headers: headers})
    return this.http.post(this.path, JSON.stringify(jokesGroup), ro).map(resp => resp.json()).catch((err: Response) => Observable.throw(err.status));
  }

  deleteJokesGroup(jokesGroupId: number): Observable<JokesGroup> {
    return this.http.delete(this.path + jokesGroupId).map(resp => resp.json()).catch((err: Response) => Observable.throw(err.status));
  }

}
