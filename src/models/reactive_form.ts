import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

interface ErrorMessages {
    [key: string]: string;
}

const ERROR_MESSAGES: ErrorMessages = {
  required: 'this field is required',
  email: 'invalid email',
  minlength: 'minimum length is',
  maxlength: 'maximum length is',
  pattern: 'invalid format',
  nonNullable: 'this field is required',
  min: 'minimum value is',
  max: 'maximum value is',
  nameAlreadyExists: 'name already exists',
};

export abstract class ReactiveFormComponent {
  form!: FormGroup;

  abstract initForm(): void;

  resetForm(value?: any) {
    this.form.reset(value);
  }

  get validForm() {
    return this.form.valid;
  }
  
  get invalidForm() {
    return this.form.invalid;
  }

  formErrorMessage(formControlName: string): string | undefined {
    const control = this.form.get(formControlName);
    if (control && control.invalid && (control.dirty || control.touched)) {
      const errors = control.errors;
      return this.getTextErrorMessage(errors);
    }

    return;
  }

  private getTextErrorMessage(errors: ValidationErrors | null): string | undefined {
    if (errors) {
      const errorKey = Object.keys(errors)[0];
      const errorMessage = ERROR_MESSAGES[errorKey];
      if (errorMessage) {
        if (errorKey === 'minlength' || errorKey === 'maxlength') {
          return `${errorMessage} ${errors[errorKey].requiredLength}`;
        }
        if (errorKey === 'min' || errorKey === 'max') {
          return `${errorMessage} ${errors[errorKey].min ?? errors[errorKey].max}`;
        }

        return `${errorMessage}`;
      }
    }

    return;
  }

  markFormTouched() {
    this.form.markAllAsTouched();
  }

  getMaxLengthValue(control: FormControl): number | null {
    if (control && control.validator) {
      const validator = control.validator({} as AbstractControl);
      if (validator && validator['maxLength']) {
        return validator['maxLength'].requiredLength;
      }
    }
    return null;
  }
}
