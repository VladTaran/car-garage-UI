import { NgModule } from "@angular/core";
import { LoginComponent } from "../auth/login/login.component";
import { SignupComponent } from "../auth/signup/signup.component";
import { RecoveryComponent } from "./recovery/recovery.component";
import { Routes, RouterModule } from "@angular/router";
import { PageHeaderComponent } from "../page/page-header/page-header.component";
import { TitleGuard } from "../title.guard";

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [TitleGuard], data:{ title: "Please, introduce yourself"} },
  { path: 'signup', component: SignupComponent, canActivate: [TitleGuard], data:{ title: "User registration"} },
  { path: 'recovery', component: RecoveryComponent, canActivate: [TitleGuard], data:{ title: "Forgot your password?"} },
  { path: '', component: PageHeaderComponent, outlet: "title" }
];

@NgModule({
  imports:[
    RouterModule.forChild(routes)
  ]
})
export class AuthRoutingModule{

}
