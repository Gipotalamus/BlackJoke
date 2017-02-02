import {Injectable} from "@angular/core";
import {User} from "../user/user";
import {Router} from "@angular/router";
@Injectable()
export class FakeUserService {


  user: User;


  constructor(private router: Router) {
    this.user = new User(0, 'admin', 'ROLE_ADMIN', false);
  }

  login(name: string, password: string) {
      this.user.loggedIn = true;
      localStorage.setItem('token', 'false_token');
      this.router.navigate(['/jokes']);
    }



  logout() {
    localStorage.removeItem('token');
    this.user.loggedIn = false;
    this.router.navigate(['/jokes']);
  }
}
