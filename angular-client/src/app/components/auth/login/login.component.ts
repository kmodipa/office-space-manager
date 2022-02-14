import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import UserModel from "../../../core/models/user-model";
import {AuthService} from "../../../services/http/auth-service/auth.service";
import {ToastrService} from "ngx-toastr";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  navLabel = "Login";
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private  authSrevice: AuthService,
              private toasterService: ToastrService) { }

  ngOnInit(): void {
    this.initiateForm();
  }

  loginUser(): void {
    this.markFormFieldsAsTouched();
    if (this.loginForm.valid) {
      let userModel = <UserModel>{
        email: this.email.value,
        password: this.password.value
      }

      this.authSrevice.Login(userModel).subscribe( (res: HttpResponse<any>) => {
        console.log(res);
        this.returnHome();
      }, (error => {
        if (error.status == 401) {
          this.toasterService.error('Login Credentials Incorrect')
        }
        console.log(error);
      }));
    }
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
