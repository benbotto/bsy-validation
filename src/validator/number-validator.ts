import { Validator } from './';

export class NumberValidator implements Validator {
  /**
   * Checks that a value is a number or string that can be coerced to a number.
   */
  validate(val: any): boolean {
    return val === undefined || val === null || !isNaN(Number(val));
  }

  getErrorMessage(propName: string): string {
    return `"${propName}" must be a valid number.`;
  }
}

