import * as moment from 'moment';

import { Validator, StringValidator } from './';

export class ISO8601Validator implements Validator {
  /**
   * Checks that a string is a UTC (zulu) ISO8601 date.
   */
  validate(val: any): boolean {
    const strVal = new StringValidator();

    if (!strVal.validate(val))
      return false;

    return val === undefined || val === null ||
      moment(val, 'YYYY-MM-DDTHH:mm:ss.sssZ', true).isValid();
  }

  getErrorMessage(propName: string): string {
    return `"${propName}" must be a valid UTC date in ISO8601 format.`;
  }
}

