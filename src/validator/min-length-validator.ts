import { Validator } from './';

export class MinLengthValidator implements Validator {
  constructor(private minLength: number) {
  }

  validate(val: any): boolean {
    return val === undefined || val === null || String(val).length >= this.minLength;
  }

  getErrorMessage(propName: string): string {
    return `"${propName}" must be at least ${this.minLength} characters long.`;
  }
}

