import {Component, OnInit} from "@angular/core";
import {JokesGroupsService} from "../services/jokes-groups.service";
import {JokeService} from "../services/jokes.service";
import {Joke} from "../jokes/joke";
import {JokesGroup} from "../jokes-groups/jokes-groups";
import {User} from "../user/user";
import {Router} from "@angular/router";
import {PaginationService} from "../services/pagination.service";
@Component({
  templateUrl: './add-joke.component.html',
  styleUrls: ['./add-joke.component.css']
})
export class AddJoke implements OnInit {
  groups: JokesGroup[];
  group: JokesGroup = new JokesGroup(null, null);
  content: string = '';

  constructor(private jokesGroupsService: JokesGroupsService, private jokeService: JokeService,
              private router: Router, private paginationService: PaginationService) {
  }

  formSubmit() {
    let date: Date = new Date();
    let joke: Joke = new Joke(null, this.content, this.group, date, new User(null, 'admin'), null);
    this.jokeService.saveJoke(joke).subscribe(data => console.log(data));
    this.router.navigate(['/'], {
      queryParams: {
        'filter': this.paginationService.filter,
        'page': this.paginationService.page,
        'size': this.paginationService.pageSize
      }
    });
  }

  ngOnInit(): void {
    this.jokesGroupsService.getJokesGroups().subscribe(data => {
      this.groups = data;
      this.group = this.groups[0];
    });
  }
}
