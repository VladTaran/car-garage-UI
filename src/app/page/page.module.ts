import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AngularMaterialModule } from "../angular-material.module";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { PageNotFoundComponent } from "./page-notfound/page-notfound.component";
import { WidePageComponent } from "./wide-page/wide-page.component";
import { UserInfoSidebarComponent } from "../side-bar/user-info-sidebar/user-info-sidebar.component";


@NgModule({
  declarations:[PageNotFoundComponent, WidePageComponent, UserInfoSidebarComponent],
  imports:[
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class PageModule{}
