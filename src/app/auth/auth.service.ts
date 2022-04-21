import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./auth.data.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { environment } from '../../environments/environment';

const BACKEND_URL = `${environment.apiUrl}/user`

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoading:boolean = false;
  private token:string | null = null;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated:boolean = false;
  private userId: string | null = null;

  constructor(private http:HttpClient, private router: Router){}

  autoAuthUser(){
    this.token = localStorage.getItem('token');
    if (this.token){
      this.isAuthenticated = true;
      this.userId = localStorage.getItem('userId');
      this.authStatusListener.next(true);
    }
  }

  createUser(email:string, password:string){
    this.http.post<{message:string, userId:string}>(
      `${BACKEND_URL}/signup`,
      { email: email, password: password })
      .subscribe({
        complete: () => {
          this.router.navigate(['/auth/login']);
        },
        error: error => { this.authStatusListener.next(false); }
      });
  }

  login(email:string, password:string){
    const user:AuthData = { email: email, password: password };
    this.http.post<{token:string, expiresIn:string, userId:string}>(`${BACKEND_URL}/login`, user)
    .subscribe(response => {
      this.token = response.token;
      if (this.token){
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.saveAuthData(this.token, response.expiresIn, response.userId);
        this.userId = response.userId;
        this.router.navigate(['/'])
      }
    });
  }

  logout(){
    this.token = '';
    this.authStatusListener.next(false);
    this.isAuthenticated = false;
    this.userId = null;
    this.clearAuthData();
    this.router.navigate(['/auth/login']);
  }

  getToken(){
    return this.token;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  getIsAuth():Boolean{
    console.log(this.token);
    return this.isAuthenticated;
  }

  getUserId(){
    return this.userId;
  }

  private saveAuthData(token:string, expiresIn:string, userId:string){
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', expiresIn);
    localStorage.setItem('userId', userId);
  }

  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('userId');
  }

}
