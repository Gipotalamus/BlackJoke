import {Component, OnInit, OnDestroy, style} from "@angular/core";
import {Joke} from "./joke";
import {JokeService} from "../services/jokes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {JokesGroupsService} from "../services/jokes-groups.service";
import {JokesGroup} from "../jokes-groups/jokes-groups";
import {PaginationService} from "../services/pagination.service";
@Component({
  templateUrl: './paginated-jokes-list.component.html',
  styleUrls: ['./paginated-jokes-list.component.css'],
})
export class PaginatedJokesListComponent implements OnInit, OnDestroy {

  jokes: Joke[];
  jokesGroups: JokesGroup[];
  currentRate: number = 7;
  private routeSub: Subscription;

  constructor(private jokeService: JokeService, private jokesGroupsService: JokesGroupsService,
              private activatedRoute: ActivatedRoute, private paginationService: PaginationService, private router: Router) {
  }

  deleteJoke(jokeId: number) {
    this.jokeService.deleteJoke(jokeId).subscribe(data => {
      --this.paginationService.collectionSize;
        this.router.navigate(['/'], {
          queryParams: {
            'filter': this.paginationService.filter,
            'page': this.paginationService.page,
            'size': this.paginationService.pageSize
          }
        });
      }
    )
  }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.queryParams.subscribe(params => {
      if (params['filter']) this.paginationService.filter = params['filter'];
      if (params['filter']==='all') this.paginationService.filter = '';
      if (params['page']) this.paginationService.page = params['page'];
      if (params['size']) this.paginationService.pageSize = params['size'];
      if (params['sort']) this.paginationService.sort = params['sort'];
      this.jokeService.getJokes(this.paginationService.filter, this.paginationService.page,
        this.paginationService.pageSize, this.paginationService.sort)
        .subscribe(data => {
          this.jokes = data;
        });

    });
    this.jokesGroupsService.getJokesGroups().subscribe(data => this.jokesGroups = data);
  }


  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
