import { Validator } from './';

export class StringValidator implements Validator {
  validate(val: any): boolean {
    return typeof(val) === 'string';
  }

  getErrorMessage(propName: string): string {
    return `"${propName}" must be a string.`;
  }
}

