import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OfficeHttpService} from "./http/office-service/office.service";

export const servicesImports = [
  OfficeHttpService
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
