import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserGarage } from "./user.model";
import { Router } from "@angular/router";
import { environment } from '../../environments/environment';

const BACKEND_URL = `${environment.apiUrl}/user/`;

@Injectable({ providedIn: 'root' })
export class UsersService{
  private current?: UserGarage = undefined;

  constructor(
    private http: HttpClient,
    private router: Router
    ){}

  getUserById(id:string){
    return this.http.get<UserGarage>(`${BACKEND_URL}${id}`);
  }

  isUserExists(property: string, value: string) {
    return this.http.get<any>(`${BACKEND_URL}exists?property=${property}&&value=${value}`);
  }
}
