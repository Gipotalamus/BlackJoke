import {Route} from "@angular/router";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./authentication/login.component";
import {AdminGuard} from "../guards/admin.guard";
import {JokesGroupsComponent} from "./jokes-groups/jokes-groups.component";
import {UserGuard} from "../guards/user.guard";
import {AddJokesGroup} from "./add-jokes-group/add-jokes-group.component";
import {AddJoke} from "./add-joke/add-joke.component";
import {AboutComponent} from "./about/about.component";
import {JokesListComponent} from "./jokes/jokes-list.component";

export const routes: Route[] = [
  {path: '', redirectTo: 'jokes', pathMatch: 'full'},
  {path: 'jokes', component: JokesListComponent},
  {path: 'about', component: AboutComponent},
  {path: 'add-joke', component: AddJoke, canActivate: [UserGuard]},
  {path: 'add-group', component: AddJokesGroup, canActivate: [UserGuard]},
  {path: 'jokes-groups', component: JokesGroupsComponent, canActivate: [AdminGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', redirectTo: 'jokes'}];
