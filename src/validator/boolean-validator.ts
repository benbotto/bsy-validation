import { Validator } from './';

export class BooleanValidator {
  /**
   * Checks that a value is of type boolean.
   */
  validate(val: any): boolean {
    return val === undefined || val === null || typeof val === 'boolean';
  }

  getErrorMessage(propName: string): string {
    return `"${propName}" must be a valid boolean.`;
  }
}

