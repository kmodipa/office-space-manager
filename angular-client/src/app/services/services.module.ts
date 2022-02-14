import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OfficeHttpService} from "./http/office-service/office.service";
import {OfficeWorkerHttpService} from "./http/office-worker-service/office-worker.service";
import {AuthService} from "./http/auth-service/auth.service";
import {UserService} from "./http/user-service/user.service";

export const servicesImports = [
  OfficeHttpService,
  OfficeWorkerHttpService,
  AuthService,
  UserService
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [],
  providers: servicesImports
})
export class ServicesModule { }
