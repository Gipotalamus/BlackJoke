import {Component, OnInit} from "@angular/core";
import {JokesGroupsService} from "../services/jokes-groups.service";
import {JokesGroup} from "../jokes-groups/jokes-groups";
import {PaginationService} from "../services/pagination.service";
import {Sort} from "./sort";
@Component({
  templateUrl: './jokes-list.component.html',
  styleUrls: ['./jokes-list.component.css']
})
export class JokesListComponent implements OnInit{

  jokesGroups: JokesGroup[];
  sorts: Sort[] =
    [new Sort('категорією', 'jokeGroup'),
    new Sort('датою', 'date'),
    new Sort('автором', 'author'),
    new Sort('рейтингом', 'votes')];

  constructor(private jokesGroupsService: JokesGroupsService, private paginationService: PaginationService) {
  }

  ngOnInit(): void {
    this.jokesGroupsService.getJokesGroups().subscribe(data => this.jokesGroups = data);
  }
}
