import {Component, OnInit} from "@angular/core";
import {JokesGroup} from "./jokes-groups";
import {JokesGroupsService} from "../services/jokes-groups.service";
import {Router} from "@angular/router";
@Component({
  templateUrl: './jokes-groups.component.html',
  styleUrls: ['./jokes-groups.component.css']
})
export class JokesGroupsComponent implements OnInit {

  groups: JokesGroup[];

  constructor(private jokesGroupsService: JokesGroupsService, private router: Router) {
  }

  ngOnInit(): void {
    this.jokesGroupsService.getJokesGroups().subscribe(data => this.groups = data);
  }

  deleteCategory(group: JokesGroup) {
    this.jokesGroupsService.deleteJokesGroup(group.id).subscribe(data => this.groups.splice(this.groups.indexOf(group), 1));
  }
}
