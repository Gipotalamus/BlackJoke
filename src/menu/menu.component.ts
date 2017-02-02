import {Component, Input, Output, EventEmitter} from "@angular/core";
import {JokesGroup} from "../jokes-groups/jokes-groups";
import {UserService} from "../services/user.service";
@Component({
  selector: 'jokes-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class JokesMenu {
   constructor(private userService: UserService) {

   }

   logout() {
     this.userService.logout();
   }
}
