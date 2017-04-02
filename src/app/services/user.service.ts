import {Http, Headers, RequestOptions} from "@angular/http";
import {Injectable, Inject} from "@angular/core";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../user/user";
import {basePath, path} from "./path.config";

@Injectable()
export class UserService {


  user: User;
  path: string;

  constructor(private http: Http, private router: Router, @Inject(basePath) private basePath: string) {
    this.path = `${basePath}login`;
    let name: string = localStorage.getItem('user');
    let role: string = localStorage.getItem('role');
    if (name) {
      this.user = new User(null, name, null, null, role, true);
    } else {
      this.user = new User(null, null, null, null, 'anonymous', false);
      localStorage.removeItem('token');
    }
  }

  login(name: string, password: string, remember: boolean) {
    this.http.post(this.path, JSON.stringify({
      username: name,
      password: password
    })).subscribe(resp => {
      if (resp.status == 200) {
        let token = resp.headers.get('Authorization').substr(7);
        console.log(resp.headers);
        this.user.name = resp.headers.get('User');
        this.user.role = resp.headers.get('Roles');
        this.user.loggedIn = true;
        if (remember) {
          localStorage.setItem('user', this.user.name);
          localStorage.setItem('role', this.user.role);
        }
        localStorage.setItem('token', token);
        this.router.navigate(['/jokes']);
      }
    }, error => alert(error.toString()));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.user = new User(null, null, null, null, 'anonymous', false);
    this.router.navigate(['/jokes']);
  }

  addUser(user: User, photo: File): Observable<any> {
    console.log(photo.name);
    let fd = new FormData();
    fd.append('user', new Blob([JSON.stringify(user)], {type: "application/json"}));
    fd.append('photo', photo);
    let headers: Headers = new Headers();
    let ro: RequestOptions = new RequestOptions({headers: headers});
    return this.http.post(`${this.basePath}users`, fd, ro);
  }
}
