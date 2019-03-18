import { Validator, StringValidator } from './';

export class EmailValidator {
  /**
   * Regex taken from http://emailregex.com/.
   */
  validate(val: any): boolean {
    const strVal = new StringValidator();

    if (!strVal.validate(val))
      return false;

    return val === undefined || val === null ||
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);
  }

  getErrorMessage(propName: string): string {
    return `"${propName}" must be a valid email address.`;
  }
}

