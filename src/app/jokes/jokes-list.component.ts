import {Component, OnInit} from "@angular/core";
import {JokesGroupsService} from "../services/jokes-groups.service";
import {JokesGroup} from "../jokes-groups/jokes-groups";
import {Sort} from "./sort";
import {JokeService} from "../services/jokes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Joke} from "./joke";
import {VoteService} from "../services/vote.service";
import {Vote} from "../votes/vote";


@Component({
  templateUrl: './jokes-list.component.html',
  styleUrls: ['./jokes-list.component.css']
})
export class JokesListComponent implements OnInit {

  jokesGroups: JokesGroup[];
  jokes: Joke[];
  sorts: Sort[] =
    [new Sort('категорією', 'jokeGroup'),
      new Sort('датою', 'date'),
      new Sort('автором', 'author'),
      new Sort('рейтингом', 'votes')];

  constructor(private jokesGroupsService: JokesGroupsService, private jokeService: JokeService,
              private voteService: VoteService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    console.log('hi from init');
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['filter']) this.jokeService.filter = params['filter'];
      if (params['filter'] === 'all') this.jokeService.filter = '';
      if (params['page']) this.jokeService.page = params['page'] - 1;
      if (params['size']) this.jokeService.pageSize = params['size'];
      if (params['sort']) this.jokeService.sort = params['sort'];
    });
    this.jokesGroupsService.getJokesGroups().subscribe(data => {
      this.jokesGroups = data;
    });

    this.getJokes();
  }

  getJokes(): void {
    this.jokeService.getJokes().subscribe(data => {
      if (data.status === 200) {
        let json = data.json();
        this.jokeService.collectionSize = json['totalElements'];
        this.jokes = json['content'];
      }
    });
  }

  deleteJoke(joke: Joke) {
    this.jokeService.collectionSize--;
    if (this.jokeService.collectionSize % this.jokeService.pageSize === 0 &&
      this.jokeService.page === Math.ceil(this.jokeService.collectionSize / this.jokeService.pageSize)) {
      this.jokeService.page--;
    }
    this.jokeService.deleteJoke(joke.id).subscribe(data => {
        if (data.status == 204) {
          this.jokeService.statusMessage = 'deleted';
          this.getJokes();
        }
      }
    )
  }

  pageChanged(page: number) {
    console.log(page);
    this.jokeService.page = page - 1;
    this.getJokes();
    this.router.navigate(['jokes'], {queryParams: {page: page}});
  }

  selectCategory(name: string) {
    this.jokeService.filter = (name === 'all') ? '' : name ;
    this.getJokes();
  }

  selectSort(sort: string) {
    this.jokeService.sort = sort;
    this.getJokes();
  }

  vote(val: number, joke: Joke): void {
    // this.voteService.addVote(new Vote(joke, val))
    //   .subscribe(data => {
    //     console.log('voted!!!');
    //     if (data.status == 200) {
    //       this.getJokes();
    //     }
    //   });
    console.log('vote!!');
  }
}
