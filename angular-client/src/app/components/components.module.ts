import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./main/home/home.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

export const components = [
  HomeComponent
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
