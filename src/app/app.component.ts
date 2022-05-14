import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Subscription } from "rxjs";

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  isUserAuthenticated:boolean = false;
  title:string = "";
  mode:string = "";
  private authStatusSub?:Subscription;

  constructor(
    private authService: AuthService,
    private route: Router){}

  ngOnInit(){
    this.authService.autoAuthUser();

    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe({
        next: status => {
          this.isUserAuthenticated = status;
        }
      })
  }

  setValues() {
    this.title = this.invokeTitle(this.route.url);
    this.mode = this.invokeCurrentMode(this.route.url);
  }

  invokeTitle(uriStr:string): string{
    if (uriStr.indexOf('recovery') !== -1){
      return "Forgot your password?";
    }
    if (uriStr.indexOf('login') !== -1){
      return "Please, introduce yourself";
    }
    if (uriStr.indexOf('users') !== -1){
      return `Profile ${this.authService.getUserName()}`;
    }
    return "";
  }

  invokeCurrentMode(uriStr:string): string{
    if (uriStr.indexOf('recovery') !== -1){
      return "";
    }
    if (uriStr.indexOf('login') !== -1){
      return "Please, introduce yourself";
    }
    if (uriStr.indexOf('users') !== -1){
      return `Profile ${this.authService.getUserName()}`;
    }
    return "";
  }
}
