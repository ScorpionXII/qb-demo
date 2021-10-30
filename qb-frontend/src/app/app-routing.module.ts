import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from "../components/login-form/login-form.component";
import {MixedContactListComponent} from "../components/mixed-contact-list/mixed-contact-list.component";

const routes: Routes = [
  { path: '', component: LoginFormComponent },
  { path: 'home', component: MixedContactListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
