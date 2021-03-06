import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {FormControl, Validators, FormGroup, FormBuilder, AbstractControl} from "@angular/forms";
import {JokesGroup} from "../jokes-groups/jokes-groups";
import {JokesGroupsService} from "../services/jokes-groups.service";



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
      if (data.length == 0) return null;
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
        this.router.navigate(['/jokes']);
    });

  }


}


