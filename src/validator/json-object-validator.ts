import { Validator, JSONValidator } from './';

export class JSONObjectValidator implements Validator {
  /**
   * Checks that a value is valid JSON and parses to an object.
   */
  validate(val: any): boolean {
    if (val === undefined || val === null)
      return true;

    try {
      const parsed = JSON.parse(val);

      return typeof parsed === 'object' && !Array.isArray(parsed);
    }
    catch (err) {
      return false;
    }
  }

  getErrorMessage(propName: string): string {
    return `"${propName}" must be a valid JSON representation of an object.`;
  }
}

