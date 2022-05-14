import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CarCreateComponent } from "./cars/car-create/car-create.component";
import { AuthGuard } from "./auth/auth.guard";
import { UserGarageComponent } from "./user/user-garage.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { PageComponent } from "./page/page.component";
import { PageNotFoundComponent } from "./page/page-notfound/page-notfound.component";
import { WidePageComponent } from "./page/wide-page/wide-page.component";
import { PageHeaderComponent } from "./page/page-header/page-header.component";
import { TitleGuard } from "./title.guard";
import { UserInfoSidebarComponent } from "./side-bar/user-info-sidebar/user-info-sidebar.component";
import { NavBarComponent } from "./navbar/nav-bar.component";
import { EditProfileComponent } from "./user/my/edit-profile.component";

const routes: Routes = [
  { path: "",
    component: PageComponent,
    children: [
      { path: 'create', component: CarCreateComponent, canActivate: [AuthGuard] },
      { path: 'edit/:carId', component: CarCreateComponent, canActivate:[AuthGuard] },
      { path: '', component: PageHeaderComponent, outlet: "title" },
    ]
  },
  {
    path: 'users',
    component: PageComponent,
    children: [
      { path: ':userId', component: UserGarageComponent, canActivate: [AuthGuard, TitleGuard] },
      { path: '', component: NavBarComponent, outlet: "navbar" },
      { path: '', component: UserInfoSidebarComponent, outlet: "sidebar" },
      { path: '', component: PageHeaderComponent, outlet: "title" },
    ]
  },
  {
    path: 'my',
    component: WidePageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'profile', component: EditProfileComponent, canActivate: [TitleGuard], data: { title: "My profile"} },
      { path: '', component: NavBarComponent, outlet: "navbar" },
      { path: '', component: PageHeaderComponent, outlet: "title" },
    ]
  },
  {
    path: "auth",
    component: WidePageComponent,
    loadChildren: () => import('./auth/auth.module').then(x => x.AuthModule)
  },
  { path: '', component: HeaderComponent, outlet: "header" },
  { path: '', component: FooterComponent, outlet: "footer" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule{}
