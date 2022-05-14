import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Car } from "../cars/car.model";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from '../../environments/environment';

const BACKEND_URL = `${environment.apiUrl}/user/`;

@Injectable({ providedIn: 'root' })
export class UsersService{
  private current?: User = undefined;

  constructor(
    private http: HttpClient,
    private router: Router
    ){}

  getUserBydId(id:string){
    return this.http.get<{_id:string, cars: Car[]}>(`${BACKEND_URL}${id}`);
  }
}
