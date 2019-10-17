import { Validator } from './';

export class ArrayValidator implements Validator {
  /**
   * Checks that a value is an array.
   */
  validate(val: any): boolean {
    return val === undefined || val === null || Array.isArray(val);
  }

  getErrorMessage(propName: string): string {
    return `"${propName}" must be a valid array.`;
  }
}

