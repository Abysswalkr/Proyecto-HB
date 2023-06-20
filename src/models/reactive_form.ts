import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

interface ErrorMessages {
    [key: string]: string;
}

const ERROR_MESSAGES: ErrorMessages = {
  required: 'campo requerido',
  email: 'email inválido',
  minlength: 'lontigud mínima es',
  maxlength: 'longitud máxima es',
  pattern: 'formato inválido',
  nonNullable: 'campo requerido',
  min: 'valor mínimo es',
  max: 'valor máximo es',
  nameAlreadyExists: 'nombre ya existe',
  invalidCred: 'correo o contraseña inválidos',
  unknown: 'error desconocido, intente de nuevo',
  emailAlreadyExists: 'correo ya registrado',
};

export abstract class ReactiveFormComponent {
  form!: FormGroup;

  abstract initForm(): void;

  resetForm(value?: any) {
    this.form.reset(value);
  }

  setFormErrors(formControlName: string, errors: ValidationErrors) {
    this.form.get(formControlName)?.setErrors(errors);
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
