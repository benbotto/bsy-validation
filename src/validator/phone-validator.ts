import { Validator, StringValidator } from './';

export class PhoneValidator {
  /**
   * This validator only checks that the supplied phone number is a string with
   * at least 10 digits.  It strips delimiters, and doesn't check a phone
   * number's validity (e.g. an area code of 099 will pass, but is invalid in
   * the US).
   */
  validate(val: any): boolean {
    const strVal = new StringValidator();

    if (!strVal.validate(val))
      return false;

    return val.replace(/\D/g, '').length >= 10;
  }

  getErrorMessage(propName: string): string {
    return `"${propName}" must be a valid phone number.`;
  }
}

