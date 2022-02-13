import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./main/home/home.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OfficeAccordionComponent} from "./shared/office-accordion/office-accordion.component";

export const components = [
  HomeComponent,
  OfficeAccordionComponent
]

@NgModule({
  declarations: [
    components
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
