import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormRecord } from '@angular/forms';
import { AsyncValidatorService } from '../async-validator.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  userForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(32),
      ]
    }),
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\ ]*$/) // nur Buchstaben
      ]
    }),
    password: new FormGroup({
      pw1: new FormControl('', { nonNullable: true }),
      pw2: new FormControl('', { nonNullable: true }),
    }),
    confirm: new FormControl('', { nonNullable: true })
  });

  constructor(private av: AsyncValidatorService) {}

  isInvalid(controlName: string): boolean {
    const control = this.userForm.get(controlName);
    // return (control?.invalid && control?.touched) ?? false;
    // return control ? (control.invalid && control.touched) : false;
    return !!control && control.invalid && control.touched;
  }

  hasError(controlName: string, errorCode: string): boolean {
    // "Hat ein bestimmtes Control einen bestimmten Error?"
    const control = this.userForm.get(controlName);
    return !!control && control.hasError(errorCode) && control.touched; // (control.touched || control.dirty);
  }


  submitForm() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    // optionale Idee:
    // this.formDisabled = true;
    // im Template: [disabled]="formDisabled"

    const formValue = this.userForm.getRawValue();
    console.log('SUBMIT', formValue);
  }
}
