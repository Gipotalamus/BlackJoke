import {Component, OnInit} from "@angular/core";
import {JokesGroupsService} from "../services/jokes-groups.service";
import {JokeService} from "../services/jokes.service";
import {Joke} from "../jokes/joke";
import {JokesGroup} from "../jokes-groups/jokes-groups";
import {User} from "../user/user";
import {Router} from "@angular/router";

@Component({
  templateUrl: './add-joke.component.html',
  styleUrls: ['./add-joke.component.css']
})
export class AddJoke implements OnInit {
  groups: JokesGroup[];
  group: JokesGroup = new JokesGroup(null, null);
  content: string = '';

  constructor(private jokesGroupsService: JokesGroupsService, private jokeService: JokeService,
              private router: Router) {
  }

  formSubmit() {
    let date: Date = new Date();
    let joke: Joke = new Joke(null, this.content, this.group, date, new User(null, 'admin', null, null, null), null, 0);
    this.jokeService.saveJoke(joke).subscribe(resp => {
      if (resp.status === 200) {
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
