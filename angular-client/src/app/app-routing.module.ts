import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/main/home/home.component";
import {AddOfficeComponent} from "./components/main/add-office/add-office.component";
import {EditOfficeComponent} from "./components/main/edit-office/edit-office.component";

const routes: Routes = [
  {path: 'all-offices', component: HomeComponent},
  {path: 'add-office', component: AddOfficeComponent},
  {path: 'edit-office/:id', component: EditOfficeComponent},
  {path: '', redirectTo: 'all-offices', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
