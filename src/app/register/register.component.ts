import {Component, OnInit, ElementRef} from '@angular/core';
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {UserService} from "../services/user.service";
import {User} from "../user/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regForm: FormGroup;
  name: string;
  password: string;
  photo: File;


  constructor(private userService: UserService, private router: Router) {
    this.regForm = new FormGroup({
      'name': new FormControl('', Validators.compose([Validators.minLength(5), Validators.maxLength(25), Validators.required])),
      'password': new FormControl('', Validators.compose([Validators.minLength(5), Validators.maxLength(25), Validators.required])),
      'photo': new FormControl('')
    });
  }

  ngOnInit() {}

  register() {
    this.userService.addUser(new User(null, this.name, this.password, null, 'ROLE_USER', false), this.photo)
      .subscribe(resp => this.router.navigate(['jokes']));
  }

  onChange(event) {
    this.photo = event.srcElement.files[0];
  }
}
