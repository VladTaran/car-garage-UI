import { Component,OnDestroy,OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy{
  isLoading:boolean = false;
  private authStatusSub?:Subscription;

  constructor(private authService:AuthService){}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe({
        next: autStatus => { this.isLoading = false }
      });

  }

  onSignup(form:NgForm){
    if (form.invalid){
      return;
    }
    this.authService.createUser(form.value.email, form.value.password, form.value.username);
  }

  ngOnDestroy() {
    this.authStatusSub?.unsubscribe();
  }
}
