import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../../user/users.service';
import { Car } from '../../cars/car.model';

@Component({
  selector: 'user-info-sidebar',
  templateUrl: './user-info-sidebar.component.html',
  styleUrls: ['../../variables.css', '../../main.css']
})
export class UserInfoSidebarComponent implements OnInit, OnDestroy {
  isUserAuthenticated:Boolean = false;
  userId:string = '';
  cars:Car[] = [];
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    public route: ActivatedRoute,
    private usersService: UsersService
    ){}

  ngOnInit(){
  }

  ngOnDestroy(){
  }

};
