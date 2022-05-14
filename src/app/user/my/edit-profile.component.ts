import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { AuthService } from '../../auth/auth.service';
import { FormGroup }   from '@angular/forms';
import { User } from '../user.model';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['../../variables.css', '../../main.css', '../../form.css', './edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  form: FormGroup;
  public user: User = {} as User;

  constructor(
    private authService: AuthService,
    private usersService: UsersService
    ){
      this.form = new FormGroup({

      });
    }

  ngOnInit(){
    this.usersService.getUserById(this.authService.getUserId())
      .subscribe({
        next: response => {
          this.user = response.userData;
        }
      })
  }

  onSubmit(){
    if (this.form.invalid){
      return ;
    }

  }

  ngOnDestroy(){
  }

};
