import { Validator } from './';

/**
 * Validator that ensures a value is undefined.
 */
export class UndefinedValidator implements Validator {
  validate(val: any): boolean {
    return val === undefined;
  }

  getErrorMessage(propName: string): string {
    return `"${propName}" must not be defined.`;
  }
}
