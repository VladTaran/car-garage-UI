import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  isUserAuthenticated:boolean = false;
  title:string = "";

  constructor(private authService: AuthService, private route: Router){}

  ngOnInit(){
    this.authService.autoAuthUser();
  }

  setHeader() {
    let path = this.route.url.split('/')[1];
    this.title = this.invokeTitle(decodeURIComponent(path));
  }

  invokeTitle(uriStr:string): string{
    switch(uriStr){
      case "auth":
        return "Please, introduce yourself";
      case "users":
        return `Profile ${this.authService.getUserName()}`;
      default:
        return "";
    }
  }
}
