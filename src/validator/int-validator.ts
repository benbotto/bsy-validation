import { Validator } from './';

export class IntValidator {
  /**
   * Checks that a number or string is an integer or is coercible to an int.
   */
  validate(val: any): boolean {
    const type = typeof val;

    return val === undefined || val === null ||
      (type === 'string' || type === 'number') && Number(val) % 1 === 0;
  }

  getErrorMessage(propName: string): string {
    return `"${propName}" must be a valid integer.`;
  }
}

