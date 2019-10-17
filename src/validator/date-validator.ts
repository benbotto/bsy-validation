import { Validator, ISO8601Validator } from './';

export class DateValidator implements Validator {
  /**
   * Checks that the value is a date or coercible to a date (ISO8601 string).
   */
  validate(val: any): boolean {
    const iso8601Val = new ISO8601Validator();

    return val === undefined || val === null ||
      val instanceof Date && !isNaN(val.getTime()) ||
      iso8601Val.validate(val);
  }

  getErrorMessage(propName: string): string {
    return `"${propName}" must be a valid date.`;
  }
}

