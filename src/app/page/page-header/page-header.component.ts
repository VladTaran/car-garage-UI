import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { NavigationService } from "../../navigation.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit, OnDestroy{
  private titleSub?:Subscription;

  constructor(private navigationService:NavigationService, public route: ActivatedRoute){}

  title: string = 'Default Title';

  ngOnInit() {
    this.titleSub = this.navigationService.currentTitle
      .subscribe({
        next: title => {
          this.title = title;
        }
      })
  }

  ngOnDestroy() {
    this.titleSub?.unsubscribe();
  }

}
