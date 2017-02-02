import {JokesGroup} from "../jokes-groups/jokes-groups";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
@Injectable()
export class FakeJokesGroupsService {

  groups: JokesGroup[] = [];

  constructor() {
    for (let i = 0; i < 3; i++) {
      this.groups.push(new JokesGroup(i, 'group' + i));
    }

  }

  getJokesGroups(): any {
    return new Observable(observer => {observer.next(this.groups)});
  }

  saveJokesGroup(jokesGroup: JokesGroup): Observable<any> {

    return new Observable(observer => {
      this.groups.push(jokesGroup);
      observer.next(this.groups);
    });
  }

  deleteJokesGroup(jokesGroupId: number): Observable<any> {
    return new Observable(observer => {
      this.groups.splice(jokesGroupId, 1);
      observer.next(this.groups);
    });
  }

}
