import { Validator } from './';

export class NotBlankValidator implements Validator {
  validate(val: any): boolean {
    return val !== '';
  }

  getErrorMessage(propName: string): string {
    return `"${propName}" must not be blank.`;
  }
}
