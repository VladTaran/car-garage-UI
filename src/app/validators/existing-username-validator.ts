import { Directive } from '@angular/core';
import { AsyncValidatorFn, AsyncValidator, NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, timer } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { UsersService } from '../user/users.service';

export function existingUsernameValidator(userService: UsersService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    let debounceTime = 1000; //milliseconds
    return timer(debounceTime).pipe(
      switchMap(() => userService.isUserExists("nickname", control.value)),
      map((result: any) => {
        return result ? { "usernameExists": true } : null;
      })
    );
  };
}

@Directive({
  selector: '[usernameExists][formControlName],[usernameExists][formControl],[usernameExists][ngModel]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: ExistingUsernameValidatorDirective, multi: true }]
})
export class ExistingUsernameValidatorDirective implements AsyncValidator {
  constructor(private userService: UsersService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return existingUsernameValidator(this.userService)(control);
  }
}
