import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit, OnDestroy {
  isUserAuthenticated:Boolean = false;
  title:string = "TITLE";
  private authListenerSubs: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private navigation: NavigationService,
    ){}

  ngOnInit(){
    this.isUserAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isUserAuthenticated = isAuthenticated;
      });
  }

  onLogout(){
    this.authService.logout();
  }

  onHomeClick(){
    if (!this.isUserAuthenticated){
      return;
    }
    this.navigation.base();
  }

  onAccountLinkClick(){
    if (!this.isUserAuthenticated){
      return;
    }
    this.navigation.userPage(`${this.authService.getUserId()}`);
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

};
