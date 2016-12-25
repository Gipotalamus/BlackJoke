import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import {JokesListComponent} from "../jokes/jokes-list.component";
import {JokesMenu} from "../menu/menu.component";
import {RouterModule} from "@angular/router";
import {AboutComponent} from "../about/about.component";
import {AddJoke} from "../add-joke/add-joke.component";
import {JokeService} from "../services/jokes.service";
import {JokesGroupsService} from "../services/jokes-groups.service";
import {AddJokesGroup} from "../add-jokes-group/add-jokes-group.component";
import {FilteredJokesListComponent} from "../jokes/filtered-jokes-list.component";
import {PaginatedJokesListComponent} from "../jokes/paginated-jokes-list.component";
import {PaginationService} from "../services/pagination.service";
import {LoginComponent} from "../authentication/login.component";
import {JokesGroupsComponent} from "../jokes-groups/jokes-groups.component";
import {UserGuard} from "../user/user.guard";
import {UserService} from "../services/user.service";

@NgModule({
  declarations: [
    AppComponent,
    JokesListComponent,
    JokesMenu,
    AboutComponent,
    AddJoke,
    AddJokesGroup,
    FilteredJokesListComponent,
    PaginatedJokesListComponent,
    LoginComponent,
    JokesGroupsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([{path: '', redirectTo: 'jokes', pathMatch: 'full'},
                          {path: 'jokes', component: JokesListComponent,
                            children: [
                              {path: '', component: FilteredJokesListComponent,
                                children: [{path: '', component: PaginatedJokesListComponent}]}]},
                          {path: 'about', component: AboutComponent, canActivate: [UserGuard]},
                          {path: 'add-joke', component: AddJoke},
                          {path: 'add-group', component: AddJokesGroup},
                          {path: 'jokes-groups', component: JokesGroupsComponent},
                          {path: 'login', component: LoginComponent}])
  ],
  providers: [JokeService, PaginationService, JokesGroupsService, UserService, UserGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
