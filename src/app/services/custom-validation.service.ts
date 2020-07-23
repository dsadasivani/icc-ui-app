import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {


  alphaNumericValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^[a-zA-Z0-9]*$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidGstin: true };
    };
  }

  
  numberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^[0-9]*$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidNumber: true };
    };
  }

}
