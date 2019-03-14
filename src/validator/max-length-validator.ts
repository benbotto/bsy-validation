import { Validator } from './';

export class MaxLengthValidator implements Validator {
  constructor(private maxLength: number) {
  }

  validate(val: any): boolean {
    return String(val).length <= this.maxLength;
  }

  getErrorMessage(propName: string): string {
    return `"${propName}" must be at most ${this.maxLength} characters long.`;
  }
}

