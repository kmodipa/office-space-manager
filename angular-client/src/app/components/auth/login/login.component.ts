import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  navLabel = "Login";
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.initiateForm();
  }

  getUserSession(): void {

  }

  /*-- Helper Methods --*/
  returnHome(): void {
    this.router.navigate(['all-offices']);
  }

  goToSignUp(): void {
    this.router.navigate(['signUp']);
  }

  initiateForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required,
        Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  /* -Mark form as touched- */
  markFormFieldsAsTouched(): void {
    this.email.markAsTouched();
    this.password.markAsTouched();
  }

  /* Form Getters */
  get email(): AbstractControl {
    return <AbstractControl>this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return <AbstractControl>this.loginForm.get('password');
  }
}
