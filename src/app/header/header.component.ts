import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isUserAuthenticated:Boolean = false;
  private authListenerSubs: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
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
    this.router.navigate(['/']);
  }

  onAccountLinkClick(){
    if (!this.isUserAuthenticated){
      return;
    }
    this.router.navigate([`/users/${this.authService.getUserId()}`]);
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

};
