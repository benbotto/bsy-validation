import { Validator } from './';

/**
 * Make sure the length of a string or array is at least minLength.
 */
export class MinLengthValidator implements Validator {
  constructor(private minLength: number) {
  }

  validate(val: any): boolean {
    if (val === undefined || val === null)
      return true;

    return Array.isArray(val) ?
      val.length >= this.minLength : String(val).length >= this.minLength;
  }

  getErrorMessage(propName: string): string {
    return `"${propName}" must have a length of at least ${this.minLength}.`;
  }
}

