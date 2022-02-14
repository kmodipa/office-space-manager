import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import UserModel from "../../../core/models/user-model";
import {HttpResponse} from "@angular/common/http";
import {AuthService} from "../../../services/http/auth-service/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  navLabel = "Sign-Up";
  signUpForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private  authSrevice: AuthService,
              private toasterService: ToastrService) { }

  ngOnInit(): void {
    this.initiateForm();
  }

  signUp(): void {
    this.markFormFieldsAsTouched();
    if (this.signUpForm.valid) {
      let userModel = <UserModel>{
        name: this.name.value,
        email: this.email.value,
        password: this.password.value,
        passwordConfirmation: this.password.value
      }

      this.authSrevice.SignUp(userModel).subscribe( (res: HttpResponse<any>) => {
        console.log(res);
        this.router.navigate(['login']);
        this.toasterService.success('Account Created');
      });
    }
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
