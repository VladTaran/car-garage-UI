import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Car } from '../car.model';
import { CarsService } from '../cars.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit, OnDestroy{
  cars:Car[] = [];
  isLoading:Boolean = false;
  total: number = 12;
  pageSize: number = 10;
  pageSizeOptions: number[] = [2,5,10];
  page:number = 1;
  isUserAuthenticated:Boolean = false;
  userId:string|null = null;
  private carsSub: Subscription = new Subscription();
  private authStatusSub: Subscription = new Subscription();

  constructor(public carsService: CarsService, private authService:AuthService){
  }

  ngOnInit() {
    this.loadCars();
    this.isLoading = true;
    this.carsSub = this.carsService.getCarsUpdatedListener()
      .subscribe((data: { items: Car[], total:number}) => {
        this.cars = data.items;
        this.total = data.total;
        this.userId = this.authService.getUserId();
        this.isUserAuthenticated = this.authService.getIsAuth();

        this.isLoading = false;
      })
  }

  ngOnDestroy(){
    this.carsSub.unsubscribe();

  }

  onDelete(id:string){
    this.carsService.deleteCar(id)
      .subscribe(() => {
        this.carsService.getCars(this.pageSize, this.page);
      });
  }

  onPageChanged(event: PageEvent){
    this.page = event.pageIndex+1;
    this.pageSize = event.pageSize;
    this.loadCars();
  }

  loadCars(){
    this.carsService.getCars(this.pageSize, this.page);
  }

  filterCarByUserId(items:Car[]){
    return items.filter(x => x.createdby === this.userId);
  }
};
