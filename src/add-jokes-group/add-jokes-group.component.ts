import {Component, OnInit} from "@angular/core";
import {JokesGroupsService} from "../services/jokes-groups.service";
import {JokesGroup} from "../jokes-groups/jokes-groups";
import {Router} from "@angular/router";
import {FormControl, Validators, FormGroup, FormBuilder, AbstractControl} from "@angular/forms";
import {Observable} from "rxjs";


@Component({
  templateUrl: './add-jokes-group.component.html',
  styleUrls: ['add-joke-group.component.css']
})
export class AddJokesGroup implements OnInit {

  groupsForm: FormGroup;
  name: string = '';
  groups: JokesGroup[] = [];

  constructor(private jokesGroupsService: JokesGroupsService, private router: Router, private fb: FormBuilder) {
  }


  ngOnInit(): void {
    this.groupsForm = this.fb.group({groupName: new FormControl('', Validators.required, this.asyncValidation.bind(this))});
  }


  asyncValidation(control: FormControl) {
    return this.jokesGroupsService.getJokesGroups().map(data => {
      for (let group of data) {
        if (group.name === control.value) {
          console.log('invalid');
          return ({existsGroup: true});
        }
        console.log('valid');
        return null;
      }});
  }

  formSubmit() {
    this.jokesGroupsService.saveJokesGroup(new JokesGroup(null, this.name)).subscribe(data => {
      if (data.status == 200) {
        this.router.navigate(['/jokes']);
      }
    });

  }


}


