
import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";

@Injectable()
export class UserGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('token') === null)
      this.router.navigate(['/login']);
    return localStorage.getItem('token') === null ? false : true;
  }
}
