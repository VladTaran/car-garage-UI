import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy{
  private authStatusSub?:Subscription;
  isUserAuthenticated: Boolean = false;

  navList:any[] = [
    { title: "Title 1", onClick: this.onItemCLick },
    { title: "Title 2", onClick: this.onItemCLick}
  ];

  constructor(private authService:AuthService){}

  ngOnInit() {
    this.isUserAuthenticated = this.authService.getIsAuth();
  }

  ngOnDestroy() {
    this.authStatusSub?.unsubscribe();
  }

  onItemCLick(){
      console.log('item clicked');
  }

}
