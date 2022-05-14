import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { NavigationService } from './navigation.service';

@Injectable()
export class TitleGuard implements CanActivate{

  constructor(private navigationService: NavigationService){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
      const title = route.data['title'];
      if (title){
        this.navigationService.changeTitle(title);
      }
      return true;
    }
}
