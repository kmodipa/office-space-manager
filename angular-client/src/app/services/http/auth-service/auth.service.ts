import { Injectable } from '@angular/core';
import {UserService} from "../user-service/user.service";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import UserModel from "../../../core/models/user-model";
import {shareReplay, tap} from "rxjs/operators";
import ResponseModel from "../../../core/models/response-model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService,
              private httpClient: HttpClient,
              private router: Router) { }

  Login(model: UserModel) {
    return this.userService.Login(model).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.SetSession(res.body);
        console.log('Logged IN');
        console.log(res);
      })
    )
  }

  SignUp(model: UserModel) {
    return this.userService.SignUp(model).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.SetSession(res.body);
        console.log('Signed Up');
        console.log(res);
      })
    )
  }

  isLoggedIn() {
    return !!localStorage.getItem('x-access-token');
  }

  SetAccesToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken);
  }

  private SetSession(res: HttpResponse<any>) {
    let response: ResponseModel = <ResponseModel><unknown>res;
    console.log(response);
    localStorage.setItem('x-access-token', response.accessToken);
    localStorage.setItem('x-refresh-token', response.refreshToken);
    console.log(localStorage);
  }

  private RemoveSession() {
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
    this.LogOut();
  }

  LogOut() {
    if (this.isLoggedIn()) {
      this.RemoveSession();
    }
  }
}
