import { Validator } from './';

export class InValidator<T> implements Validator {
  constructor(private validValues: T[]) {
  }

  /**
   * Checks that a value is in an array.
   */
  validate(val: any): boolean {
    if (val === undefined || val === null)
      return true;

    return this.validValues
      .indexOf(val) !== -1;
  }

  getErrorMessage(propName: string): string {
    return `"${propName}" must be one of "${this.validValues.join(', ')}."`;
  }
}

