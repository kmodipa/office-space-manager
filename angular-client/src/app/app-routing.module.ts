import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/main/home/home.component";
import {AddOfficeComponent} from "./components/main/add-office/add-office.component";
import {EditOfficeComponent} from "./components/main/edit-office/edit-office.component";
import {OfficeComponent} from "./components/main/office/office.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {SignupComponent} from "./components/auth/signup/signup.component";

const routes: Routes = [
  {path: 'all-offices', component: HomeComponent},
  {path: 'office/:id', component: OfficeComponent},
  {path: 'add-office', component: AddOfficeComponent},
  {path: 'edit-office/:id', component: EditOfficeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signUp', component: SignupComponent},
  {path: '', redirectTo: 'all-offices', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
