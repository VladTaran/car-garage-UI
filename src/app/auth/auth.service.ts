import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./auth.data.model";
import { Subject, Subscription } from "rxjs";
import { environment } from '../../environments/environment';
import { NavigationService } from "../navigation.service";

const BACKEND_URL = `${environment.apiUrl}/auth`

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoading:boolean = false;
  private token:string | null = null;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated:boolean = false;
  private userId: string | null = null;
  private username: string | null = null;
  private tokenTimer: any;

  constructor(private http:HttpClient, private navigation: NavigationService){}

  autoAuthUser(){
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.username = authInformation.username;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  createUser(email:string, password:string, username:string): Subscription{
    return this.http.post<{message:string, userId:string}>(
      `${BACKEND_URL}/signup`,
      { email: email, password: password, nickname: username })
      .subscribe({
        complete: () => {
          this.navigation.login();
        },
        error: () => { this.authStatusListener.next(false); }
      });
  }

  login(email:string, password:string){
    const user:AuthData = { email: email, password: password };
    this.http.post<{token:string, expiresIn:number, userId:string, userName:string}>(`${BACKEND_URL}/token`, user)
    .subscribe({
      next: response => {
        this.token = response.token;
        if (this.token){
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.username = response.userName;


          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );

          this.saveAuthData(this.token, expirationDate, response.userId, response.userName);
          this.authStatusListener.next(true);

          this.navigation.userPage(response.userId);
        }
      },
      error: error => {
        this.authStatusListener.next(false);
      }
  });
  }

  logout(){
    this.token = '';
    this.authStatusListener.next(false);
    this.isAuthenticated = false;
    this.userId = null;
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
    this.navigation.login();
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

  getUserId():string{
    return this.userId as string;
  }

  getUserName(){
    return this.username;
  }

  private saveAuthData(token:string, expiresIn:Date, userId:string, username:string){
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', expiresIn.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('username', username);
  }

  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiresIn");
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      username: username
    };
  }

}
