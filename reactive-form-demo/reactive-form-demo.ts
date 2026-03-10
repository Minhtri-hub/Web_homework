import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dateRangeValidator, matchFieldsValidator } from '../validators/match-fields.validator';

@Component({
  selector: 'app-reactive-form-demo',
  standalone: false,
  templateUrl: './reactive-form-demo.html',
  styleUrl: './reactive-form-demo.css',
})
export class ReactiveFormDemo {
  submittedData?: unknown;
  profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        age: [null as number | null, [Validators.required, Validators.min(18)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
      },
      {
        validators: [matchFieldsValidator('password', 'confirmPassword'), dateRangeValidator('startDate', 'endDate')],
      }
    );
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.submittedData = this.profileForm.value;
  }
}
