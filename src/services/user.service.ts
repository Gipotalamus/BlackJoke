import {Http} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class UserService {

  constructor(private http: Http) {
  }

  login(name: string, password: string) {
  }

  logout() {
  }
}
