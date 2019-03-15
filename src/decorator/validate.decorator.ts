import { Validator } from '../validator/';
import { ValidationMetadata } from './';
import { validationFactory } from '../';

export function Validate(...validators: Validator[]): Function {
  return function isDecorator(target: any, propName: string): void {
    const meta = new ValidationMetadata(
      target.constructor, propName, validators);
    
    validationFactory.addMetadata(meta);
  }
}

