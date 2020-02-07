import { Validator, StringValidator } from './';

export class PhoneValidator implements Validator {
  /**
   * Only checks US phone numbers.  Regex from http://phoneregex.com/.
   */
  validate(val: any): boolean {
    const strVal = new StringValidator();

    if (!strVal.validate(val))
      return false;

    return val === undefined || val === null ||
      /^\(?[2-9][0-8][0-9]\)?[-.\s]?[2-9][0-9]{2}[-.\s]?[0-9]{4}(?:\se?x?t?\.?\s?\d*)?$/.test(val);
  }

  getErrorMessage(propName: string): string {
    return `"${propName}" must be a valid phone number.`;
  }
}

