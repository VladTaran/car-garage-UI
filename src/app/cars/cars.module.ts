import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AngularMaterialModule } from "../angular-material.module";
import { RouterModule } from "@angular/router";

import { CarsListComponent } from "./cars-list/cars-list.component";
import { CarCreateComponent } from "./car-create/car-create.component";

@NgModule({
  declarations:[CarsListComponent, CarCreateComponent],
  imports:[
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class CarsModule{

}
