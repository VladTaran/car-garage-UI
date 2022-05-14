import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['../variables.css', '../main.css', './footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {
  isUserAuthenticated:Boolean = false;
  private authListenerSubs: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private navigation: NavigationService,
    ){}

  ngOnInit(){
  }

  ngOnDestroy(){
  }

};
