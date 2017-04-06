import {Component, OnInit} from "@angular/core";
import {JokesGroupsService} from "../services/jokes-groups.service";
import {JokeService} from "../services/jokes.service";
import {Joke} from "../jokes/joke";
import {JokesGroup} from "../jokes-groups/jokes-groups";
import {User} from "../user/user";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
  templateUrl: './add-joke.component.html',
  styleUrls: ['./add-joke.component.css']
})
export class AddJoke implements OnInit {
  groups: JokesGroup[];
  group: JokesGroup = new JokesGroup(null, null);
  content: string = '';

  constructor(private jokesGroupsService: JokesGroupsService, private jokeService: JokeService,
              private router: Router, private userService: UserService) {
  }

  formSubmit() {
    let date: Date = new Date();
    console.log(this.userService.user);
    let joke: Joke = new Joke(null, this.content, this.group, date, this.userService.user, null, 0);
    this.jokeService.saveJoke(joke).subscribe(resp => {
        this.jokeService.statusMessage = 'saved';
        this.router.navigate(['jokes'], {
          queryParams: {
            'col': this.jokeService.collectionSize,
            'filter': this.jokeService.filter,
            'page': this.jokeService.page,
            'size': this.jokeService.pageSize
          }
        })
      }
    );
    ++this.jokeService.collectionSize;
  }

  ngOnInit(): void {
    this.jokesGroupsService.getJokesGroups().subscribe(data => {
      this.groups = data;
      this.group.name = this.groups[0].name;
    });
  }
}
