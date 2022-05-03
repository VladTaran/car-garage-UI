import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
import { Car } from '../cars/car.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'user-garage',
  templateUrl: './user-garage.component.html',
  styleUrls: ['./user-garage.component.css']
})
export class UserGarageComponent implements OnInit, OnDestroy {
  isUserAuthenticated:Boolean = false;
  private authListenerSubs: Subscription = new Subscription();
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
    this.isLoading = true;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('userId')){
        this.userId = paramMap.get('userId') as string;
        this.usersService.getUserBydId(this.userId)
          .subscribe(user => {
            this.cars = user.cars;
            this.isLoading = false;
          });
      }
    });
  }

  getImageFileUrl(fileId:string){
    return `${environment.bucketUrl}${fileId}`;
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

};
