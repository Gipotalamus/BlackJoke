import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {UserService} from "../services/user.service";
import {User} from "../user/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regForm: FormGroup;
  name: string;
  password: string;

  constructor(private userService: UserService) {
    this.regForm = new FormGroup({
      'name': new FormControl('', Validators.compose([Validators.minLength(5), Validators.minLength(25), Validators.required])),
      'password': new FormControl('', Validators.compose([Validators.minLength(5), Validators.maxLength(25), Validators.required]))});
  }

  ngOnInit() {

  }

  register() {

    console.log('register');
    this.userService.addUser(new User(null, this.name, this.password, 'ROLE_USER', false)).subscribe(resp => console.log(resp));
  }

}
