import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Car } from "./car.model";
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { NavigationService } from "../navigation.service";

const BACKEND_URL = `${environment.apiUrl}/cars`;

@Injectable({ providedIn: 'root' })
export class CarsService{
  private cars: Car[] = [];
  private carsUpdated = new Subject<{items:Car[], total: number}>();

  constructor(
    private http: HttpClient,
    private navigation: NavigationService
    ){}

  addCar(model:string, year:string, imageId:string){
    this.http.post<{message:string, car: Car}>(BACKEND_URL, { model: model, year: year, imageId: imageId})
      .subscribe((postData:any) => {
        this.navigation.base();
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
        imageId: image,
        createdby: null
      }
    }

    this.http.put<{message:string, car: Car}>(`${BACKEND_URL}/${id}`, carData)
      .subscribe(() => {
        this.navigation.base();
      });
  }

  getCars(pagesize:number, currentpage:number) {
    const queryParams = `?take=${pagesize}&skip=${currentpage}`;
    this.http
    .get<{message:string, items:any, total:number}>(`${BACKEND_URL}${queryParams}`)
    .pipe(map((carsData) => {
      return {
        items: carsData.items.map((item:any) => {
          return {
              model: item.model,
              year: item.year,
              id: item._id,
              imageId: item.imageId,
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
    return this.http.get<{_id:string, model: string, year:string, imageId:string, createdby:string}>(`${BACKEND_URL}/${id}`);
  }

  uploadFileToS3(formData: FormData){
    return this.http.post<{url:string}>(`${environment.apiUrl}/file`, formData);
  }
}
