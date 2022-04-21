import { Component, Injectable, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.autoAuthUser();
  }

}
