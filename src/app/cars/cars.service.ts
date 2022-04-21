import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Car } from "./car.model";
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";
import { environment } from '../../environments/environment';

const BACKEND_URL = `${environment.apiUrl}/cars`;

@Injectable({ providedIn: 'root' })
export class CarsService{
  private cars: Car[] = [];
  private carsUpdated = new Subject<{items:Car[], total: number}>();

  constructor(
    private http: HttpClient,
    private router: Router
    ){}

  addCar(model:string, year:string, image:File){
    const formData = new FormData();
    formData.append('model', model);
    formData.append('year', year);
    formData.append('image', image, model);

    this.http.post<{message:string, car: Car}>(BACKEND_URL, formData)
      .subscribe((postData:any) => {
        this.router.navigate(['/']);
      })
  }

  deleteCar(id: string){
    return this.http.delete(`${BACKEND_URL}/${id}`);
  }

  updateCar(id:string, model: string, year:string, image: File | string){
    let carData: Car | FormData;
    if (typeof(image) === 'object'){
      carData = new FormData();
      carData.append("id", id);
      carData.append('model', model);
      carData.append('year', year);
      carData.append('image', image, model);
    } else{
      carData = {
        id: id,
        model: model,
        year: year,
        imagePath: image,
        createdby: null
      }
    }

    this.http.put<{message:string, car: Car}>(`${BACKEND_URL}/${id}`, carData)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  getCars(pagesize:number, currentpage:number) {
    const queryParams = `?size=${pagesize}&page=${currentpage}`;
    this.http
    .get<{message:string, cars:any, total:number}>(`${BACKEND_URL}${queryParams}`)
    .pipe(map((carsData) => {
      return {
        items: carsData.cars.map((item:any) => {
          return {
              model: item.model,
              year: item.year,
              id: item._id,
              imagePath: item.imagePath,
              createdby: item.createdby
            }
        }),
        total: carsData.total
      };
    }))
    .subscribe((response) => {
      this.cars = response.items;
      this.carsUpdated.next({ items: [...this.cars], total: response.total });
    });
  }

  getCarsUpdatedListener(){
    return this.carsUpdated.asObservable();
  }

  getCarBydId(id:string){
    return this.http.get<{_id:string, model: string, year:string, imagePath:string, createdby:string}>(`${BACKEND_URL}/${id}`);
  }
}
