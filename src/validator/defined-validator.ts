import { Validator } from './';

export class DefinedValidator implements Validator {
  validate(val: any): boolean {
    return val !== undefined;
  }

  getErrorMessage(propName: string): string {
    return `"${propName}" must be defined.`;
  }
}

