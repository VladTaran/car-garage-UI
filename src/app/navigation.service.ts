import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavigationService{
  private titleSource = new BehaviorSubject<string>("");
  currentTitle = this.titleSource.asObservable();

  constructor(private router: Router){}

  base(){
    this.router.navigate(['/']);
  }

  login(){
    this.router.navigate(['/auth/login', {outlets: { login:['auth']}}]);
  }

  userPage(userId:string){
    this.router.navigate([`/users/${userId}`]);
  }

  changeTitle(title:string){
    this.titleSource.next(title);
  }

  myProfile(){
    this.router.navigate(['/my/profile']);
  }
}
