import {Component, OnInit} from "@angular/core";
import {UserService} from "../services/user.service";
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  formSubmit() {
    this.userService.login(this.loginForm.get('login').value, this.loginForm.get('password').value);
  }
}
