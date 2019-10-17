import { Validator } from './';

export class JSONValidator implements Validator {
  /**
   * Checks that a value is valid JSON.
   */
  validate(val: any): boolean {
    if (val === undefined || val === null)
      return true;

    try {
      JSON.parse(val);
      return true;
    }
    catch (err) {
      return false;
    }
  }

  getErrorMessage(propName: string): string {
    return `"${propName}" must be valid JSON.`;
  }
}

