import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OfficeHttpService} from "./http/office-service/office.service";
import {OfficeWorkerHttpService} from "./http/office-worker-service/office-worker.service";

export const servicesImports = [
  OfficeHttpService,
  OfficeWorkerHttpService
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
