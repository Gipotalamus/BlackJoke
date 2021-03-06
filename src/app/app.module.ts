import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {JokesListComponent} from "./jokes/jokes-list.component";
import {JokesMenu} from "./menu/menu.component";
import {RouterModule} from "@angular/router";
import {AboutComponent} from "./about/about.component";
import {AddJoke} from "./add-joke/add-joke.component";
import {JokesGroupsService} from "./services/jokes-groups.service";
import {AddJokesGroup} from "./add-jokes-group/add-jokes-group.component";
import {LoginComponent} from "./authentication/login.component";
import {JokesGroupsComponent} from "./jokes-groups/jokes-groups.component";
import {UserGuard} from "../guards/user.guard";
import {JokeService} from "./services/jokes.service";
import {UserService} from "./services/user.service";
import {VoteService} from "./services/vote.service";
import {PaginationComponent} from './pagination/pagination.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register/register.component';
import {AdminGuard} from "../guards/admin.guard";
import { JokeComponent } from './joke/joke.component';
import {routes} from "./app.routes";
import {path, basePath} from "./services/path.config";


@NgModule({
  declarations: [
    AppComponent,
    JokesListComponent,
    JokesMenu,
    AboutComponent,
    AddJoke,
    AddJokesGroup,
    LoginComponent,
    JokesGroupsComponent,
    PaginationComponent,
    RegisterComponent,
    JokeComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [JokeService, JokesGroupsService, UserService, VoteService, UserGuard, AdminGuard, {provide: basePath, useValue: path}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
