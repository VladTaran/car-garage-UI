import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularMaterialModule } from "../angular-material.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { RecoveryComponent } from "./recovery/recovery.component";
import { SignupComponent } from "./signup/signup.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations:[
    LoginComponent,
    SignupComponent,
    RecoveryComponent
  ],
  imports:[
    AngularMaterialModule,
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class AuthModule{

}
