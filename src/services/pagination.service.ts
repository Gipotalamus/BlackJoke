import {Injectable} from "@angular/core";

@Injectable()
export class PaginationService{

  filter: string = '';
  page: number = 0;
  pageSize: number = 5;
  collectionSize: number = 10;
  sort: string = 'date';
}
