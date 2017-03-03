import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, FormControl, Validators, Validator, AbstractControl} from "@angular/forms";
@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regForm: FormGroup;
  name: string;
  mail: string;
  private pass: string;
  private passConfirm: string;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    let regName: FormControl = new FormControl('', Validators.required);
    let regMail: FormControl = new FormControl('', Validators.compose([Validators.required,
      Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]));
    let regPass: FormControl = new FormControl('', Validators.minLength(5));
    let regPassConfirm: FormControl = new FormControl('', Validators.compose([Validators.required, this.confirmValidation.bind(this)]));
    this.regForm = this.fb.group({
      regName: regName,
      regMail: regMail,
      regPass: regPass,
      regPassConfirm: regPassConfirm
    });
  }

  formSubmit(val) {
    console.log(val);
  }

  confirmValidation(ac: AbstractControl) {
    if (this.pass === ac.value) return null;
    return {passNotMatch: true};
  }
}
