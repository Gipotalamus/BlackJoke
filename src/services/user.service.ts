import {Http, Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../user/user";

@Injectable()
export class UserService {


  user: User;


  constructor(private http: Http, private router: Router) {
    this.user = new User(null, null, 'anonymous', false);
  }

  login(name: string, password: string) {
    this.http.post('http://localhost:8080/login', JSON.stringify({
      username: name,
      password: password
    })).subscribe(resp => {
      let token = resp.headers.get('Authorization').substr(7);
      this.user.name = resp.headers.get('User');
      this.user.role = resp.headers.get('Roles');
      this.user.loggedIn = true;
      localStorage.setItem('token', token);
      this.router.navigate(['/jokes']);
    });
    ;
  }

  logout() {
    localStorage.removeItem('token');
    this.user.loggedIn = false;
    this.router.navigate(['/jokes']);
  }
}
