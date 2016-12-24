import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {PaginationService} from "../services/pagination.service";
@Component({
  templateUrl: './filtered-jokes-list.component.html',
  styleUrls: ['./filtered-jokes-list.component.css']
})
export class FilteredJokesListComponent {

  constructor(private router: Router, private paginationService: PaginationService) {}

  pageChange(page: number) {
    this.paginationService.page = page;
    this.router.navigate(['/'], {queryParams: {'filter': this.paginationService.filter, 'page': page,
      'size': this.paginationService.pageSize, 'sort': this.paginationService.sort}});
  }
}
