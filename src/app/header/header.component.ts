import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../variables.css', '../main.css', './header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isUserAuthenticated:Boolean = false;
  private authListenerSubs: Subscription = new Subscription();
  userProfile = '';

  constructor(
    private authService: AuthService,
    private navigation: NavigationService,
    ){}

  ngOnInit(){
    this.isUserAuthenticated = this.authService.getIsAuth();
    if (this.isUserAuthenticated){
      const userId = this.authService.getUserId();
      this.userProfile = `users/${userId}`;
    }

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
