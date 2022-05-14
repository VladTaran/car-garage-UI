import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit, OnDestroy{
  isLoading:boolean = false;
  private authStatusSub?:Subscription;
  valid:boolean = true;

  constructor(private authService:AuthService){}

  ngOnInit() {
  }

  onRecovery(form:NgForm){
    this.valid = true;

    if (form.invalid){
      return;
    }
  }

  ngOnDestroy() {
    this.authStatusSub?.unsubscribe();
  }

}
