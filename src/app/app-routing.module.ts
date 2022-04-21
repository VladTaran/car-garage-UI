import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CarCreateComponent } from "./cars/car-create/car-create.component";
import { CarsListComponent } from "./cars/cars-list/cars-list.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  { path: '', component: CarsListComponent },
  { path: 'create', component: CarCreateComponent, canActivate:[AuthGuard] },
  { path: 'edit/:carId', component: CarCreateComponent, canActivate:[AuthGuard] },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(x => x.AuthModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule{}
