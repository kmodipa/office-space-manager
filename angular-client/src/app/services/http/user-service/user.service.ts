import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import UserModel from "../../../core/models/user-model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  Login(model: UserModel) {
    return this.httpClient.post(`${this.baseUrl}/sessions`, model, {observe: 'response'});
  }

  SignUp(model: UserModel) {
    return this.httpClient.post(`${this.baseUrl}/users`, model, {observe: 'response'})
  }
}
