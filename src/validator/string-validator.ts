import { Validator } from './';

export class StringValidator implements Validator {
  validate(val: any): boolean {
    return val === undefined || val === null || typeof(val) === 'string';
  }

  getErrorMessage(propName: string): string {
    return `"${propName}" must be a string.`;
  }
}

