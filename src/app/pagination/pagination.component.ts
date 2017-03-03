import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  @Input() page: number;
  @Input() totalItems: number;
  @Input() itemsPerPage: number;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();
  pages: number[];

  constructor() { }

  ngOnChanges() {
    this.calculatePages();
  }

  calculatePages() {
    let n = Math.ceil(this.totalItems/this.itemsPerPage);
    let a = [];
    for (let i = 1; i <= n; i++) {
      a.push(i);
    }
    console.log(a.length);
    this.pages = a;
  }

  pageChange(p: number) {
    this.pageChanged.emit(p);

  }

}
