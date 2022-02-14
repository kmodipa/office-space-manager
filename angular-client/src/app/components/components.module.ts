import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./main/home/home.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OfficeAccordionComponent} from "./shared/office-accordion/office-accordion.component";
import {AddOfficeComponent} from "./main/add-office/add-office.component";
import {EditOfficeComponent} from "./main/edit-office/edit-office.component";
import {ModalComponent} from "./shared/_modal/modal.component";
import {OfficeComponent} from "./main/office/office.component";
import { OfficeWorkerComponent } from './main/office-worker/office-worker.component';
import {NavbarComponent} from "./shared/navbar/navbar.component";
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

export const components = [
  HomeComponent,
  OfficeAccordionComponent,
  AddOfficeComponent,
  EditOfficeComponent,
  ModalComponent,
  OfficeComponent,
  OfficeWorkerComponent,
  NavbarComponent,
  LoginComponent,
  SignupComponent
]

@NgModule({
  declarations: [
    components,
    OfficeWorkerComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [ components ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule { }
