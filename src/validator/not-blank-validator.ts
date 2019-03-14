import { Validator } from './';

export class NotBlankValidator {
  validate(val: any): boolean {
    return val !== '';
  }

  getErrorMessage(propName: string): string {
    return `"${propName}" must not be blank.`;
  }
}
