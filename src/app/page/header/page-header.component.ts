import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../../auth/auth.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit, OnDestroy{
  private authStatusSub?:Subscription;
  header:string = 'Please, introduce yourself';

  constructor(private authService:AuthService, public route: ActivatedRoute){}

  @Input() title: string = '';

  ngOnInit() {
  }

  ngOnDestroy() {
    this.authStatusSub?.unsubscribe();
  }

}
