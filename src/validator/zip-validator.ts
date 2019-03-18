import { Validator, StringValidator } from './';

export class ZipValidator {
  /**
   * CIDR zip validator for US.
   */
  validate(val: any): boolean {
    const strVal = new StringValidator();

    if (!strVal.validate(val))
      return false;

    return val === undefined || val === null ||
      /\d{5}([ \-]\d{4})?/.test(val);
  }

  getErrorMessage(propName: string): string {
    return `"${propName}" must be a valid zip code.`;
  }
}

