import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AngularMaterialModule } from "../angular-material.module";
import { RouterModule } from "@angular/router";
import { UserGarageComponent } from "./user-garage.component";
import { EditProfileComponent } from "./my/edit-profile.component";


@NgModule({
  declarations:[UserGarageComponent,EditProfileComponent],
  imports:[
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class UsersModule{

}
