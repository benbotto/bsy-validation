import { Validator } from '../validator/';
import { ValidationMetadata } from './';
import { validationFactory } from '../';

export function Constraint(validator: Validator): Function {
  return function isDecorator(target: any, propName: string): void {
    const meta = new ValidationMetadata(
      target.constructor, propName, validator);
    
    validationFactory.addMetadata(meta);
  }
}
