/**
 * Interface that all validators must implement.
 */
export interface Validator {
  /**
   * Do the validation.  The function can return a boolean (true if valid), or,
   * if the validation is asynchronous, a Promise (resolved if valid, rejected
   * otherwise).
   * @param val - The value to validate.
   */
  validate(val: any): boolean|Promise<any>;

  /**
   * Get an appropriate error message, which can be used if a value does not
   * pass the validation.
   * @param propName - The name of the property being validated.
   */
  getErrorMessage(propName: string): string;
}

