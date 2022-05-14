import { Directive } from '@angular/core';
import { AsyncValidatorFn, AsyncValidator, NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, timer } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { UsersService } from '../user/users.service';

export function existingEmailValidator(userService: UsersService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    let debounceTime = 1000; //milliseconds
    return timer(debounceTime).pipe(
      switchMap(() => userService.isUserExists("email", control.value)),
      map((result: any) => {
        return result ? { "useremailExists": true } : null;
      })
    );
  };
}

@Directive({
  selector: '[useremailExists][formControlName],[useremailExists][formControl],[useremailExists][ngModel]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: ExistingEmailValidatorDirective, multi: true }]
})
export class ExistingEmailValidatorDirective implements AsyncValidator {
  constructor(private userService: UsersService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return existingEmailValidator(this.userService)(control);
  }
}
