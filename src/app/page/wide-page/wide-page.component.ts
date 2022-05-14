import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-wide-page',
  templateUrl: './wide-page.component.html',
  styleUrls: ['../../variables.css','../../main.css']
})
export class WidePageComponent implements OnInit, OnDestroy {
  isUserAuthenticated:Boolean = false;
  title:string = "TITLE";

  constructor(){}

  ngOnInit(){
  }

  ngOnDestroy(){
  }

};
