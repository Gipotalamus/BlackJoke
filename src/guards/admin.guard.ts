import {CanActivate, Router} from "@angular/router";
import {UserService} from "../app/services/user.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    let isAdmin: boolean = this.userService.user.role === '[ROLE_ADMIN]';
    if (!isAdmin) this.router.navigate(['login']);
    return isAdmin;
  }
}
