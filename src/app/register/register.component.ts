import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regForm: FormGroup;

  constructor() {
    this.regForm = new FormGroup({
      'name': new FormControl('', Validators.compose([Validators.minLength(5), Validators.required])),
      'password': new FormControl('', Validators.compose([Validators.minLength(5), Validators.required]))});
  }

  ngOnInit() {

  }

  register() {
    console.log('register');
  }

}
