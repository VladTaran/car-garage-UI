import { Component,OnDestroy,OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, AsyncValidatorFn, ValidationErrors, AbstractControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { UsersService } from "src/app/user/users.service";
import { AuthService } from "../auth.service";
import { existingUsernameValidator } from "../../validators/existing-username-validator";
import { existingEmailValidator } from "../../validators/existing-email-validator";

@Component({
  selector: 'app-login',
  templateUrl: './signup.component.html',
  styleUrls: ['../../variables.css', '../../main.css', '../../form.css', './signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy{
  private maxLengthNickname:number = 16;

  errorMessages:any = {
    required: "This field is required",
    max64length: `Please enter no more than ${this.maxLengthNickname} characters`,
    email: "Should be a valid email value",
    uniqueNickname: "User with the following nickname is already registered",
    uniqueEmail: "User with entered email is already registered",
  }

  isLoading:boolean = false;

  private authStatusSub?:Subscription;

  form: FormGroup;

  constructor(private authService:AuthService, private usersService: UsersService){
    this.form = new FormGroup({
      email: new FormControl(null,
        [Validators.required, Validators.email],
        [existingEmailValidator(this.usersService)]
      ),
      nickname: new FormControl(null,
        [Validators.required],
        [existingUsernameValidator(this.usersService)]
      ),
      password: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe({
        next: autStatus => { this.isLoading = false }
      });

  }

  get email() {
    return this.form.get('email');
  }

  get nickname() {
    return this.form.get('nickname');
  }

  get password() {
    return this.form.get('password');
  }

  onSignup(){
    this.markAsDirty();

    if (this.form.invalid){
      return;
    }
    this.isLoading = true;
    this.authService.createUser(this.form.value.email, this.form.value.password, this.form.value.nickname)
      .add(() => {
        this.isLoading = false;
      });
  }

  private markAsDirty(){
    this.email?.markAsDirty();
    this.nickname?.markAsDirty();
    this.password?.markAsDirty();
  }

  ngOnDestroy() {
    this.authStatusSub?.unsubscribe();
  }
}
