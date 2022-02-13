import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  navLabel = "Sign-Up";
  signUpForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.initiateForm();
  }

  signUp(): void {

  }

  /*-- Helper Methods --*/
  returnHome(): void {
    this.router.navigate(['all-offices']);
  }

  goToLogin(): void {
    this.router.navigate(['login']);
  }

  initiateForm(): void {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      email: ['', [Validators.required,
        Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  /* -Mark form as touched- */
  markFormFieldsAsTouched(): void {
    this.name.markAsTouched();
    this.email.markAsTouched();
    this.password.markAsTouched();
  }

  /* Form Getters */
  get name(): AbstractControl {
    return <AbstractControl>this.signUpForm.get('name');
  }

  get email(): AbstractControl {
    return <AbstractControl>this.signUpForm.get('email');
  }

  get password(): AbstractControl {
    return <AbstractControl>this.signUpForm.get('password');
  }
}
