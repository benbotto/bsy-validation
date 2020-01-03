import { Validator } from './';

/**
 * Make sure the length of a string or array does not exceed maxLength.
 */
export class MaxLengthValidator implements Validator {
  constructor(private maxLength: number) {
  }

  validate(val: any): boolean {
    if (val === undefined || val === null)
      return true;
    return Array.isArray(val) ?
      val.length <= this.maxLength :String(val).length <= this.maxLength;
  }

  getErrorMessage(propName: string): string {
    return `"${propName}" must have a length that does not exceed ${this.maxLength}.`;
  }
}

