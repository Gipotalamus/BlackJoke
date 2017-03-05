import {Http, Headers, RequestOptions} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../user/user";

@Injectable()
export class UserService {


  user: User;


  constructor(private http: Http, private router: Router) {
    this.user = new User(null, null, null, 'anonymous', false);
  }

  login(name: string, password: string) {
    this.http.post('http://localhost:8080/login', JSON.stringify({
      username: name,
      password: password
    })).subscribe(resp => {
      if (resp.status == 200) {
        alert(`error ${resp.statusText}`);
        let token = resp.headers.get('Authorization').substr(7);
        this.user.name = resp.headers.get('User');
        this.user.role = resp.headers.get('Roles');
        this.user.loggedIn = true;
        localStorage.setItem('token', token);
        this.router.navigate(['/jokes']);
      }
    }, error => alert(error.toString()));
  }

  logout() {
    localStorage.removeItem('token');
    this.user.loggedIn = false;
    this.router.navigate(['/jokes']);
  }

  addUser(user: User): Observable<User> {
    let headers: Headers = new Headers({'Content-Type': 'application/json'});
    let ro: RequestOptions = new RequestOptions({headers: headers});
    return this.http.post('http://localhost:8080/users/', JSON.stringify(user), ro)
      .map(resp => resp.json());
  }
}
