import { Validator } from './';

export class NotNullValidator implements Validator {
  validate(val: any): boolean {
    return val !== null;
  }

  getErrorMessage(propName: string): string {
    return `"${propName}" must not be null.`;
  }
}

