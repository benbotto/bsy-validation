import { ValidationErrorList, ValidationError } from 'bsy-error';

import { validationFactory } from '../';
import { ValidationMetadata } from '../decorator/';

/**
 * Class used for validating an object against a set of constraints defined on
 * a class.
 */
export class ObjectValidator {
  /**
   * Validate an object as an Entity.
   * @param obj - The object to validate against class Entity.
   * @param Entity - A class that has properties decorated with @Validate.
   * This is the schema against which obj will be validated.
   */
  async validate(
    obj: object,
    Entity: {new(): any}): Promise<void> {

    const errorList = new ValidationErrorList();
    const valMetas  = validationFactory.getMetadata(Entity);

    // Because the @Validate decorator is a factory, the validators are added
    // to the ValidationFactory in reverse order.  Here the @Validates are
    // applied in order, top to bottom.  See
    // https://www.typescriptlang.org/docs/handbook/decorators.html#decorator-composition
    for (let i = valMetas.length - 1; i >= 0; --i) {
      const valMeta    = valMetas[i];
      const validators = valMeta.validators;
      const propName   = valMeta.propName;
      const value      = (obj as {[key: string]: any})[propName];
      let   valid      = true;

      // Each constraint may be composed of multiple validators.  They're
      // applied in order until one fails.
      for (let j = 0; j < validators.length && valid; ++j) {
        const validator = validators[j];

        try {
          valid = await validator.validate(value);

          // The validator can return a boolean, or a Promise that's resolved
          // when valid, rejected when invalid.  I.e., for non-boolean returns,
          // resolution means the validation passed.
          if (valid !== false)
            valid = true;
        }
        catch (err) {
          // Rejected.
          valid = false;
        }

        if (!valid) {
          errorList
            .addError(new ValidationError(
              validator.getErrorMessage(propName), propName));
        }
      }
    }

    if (errorList.errors.length)
      return Promise.reject(errorList);
    return Promise.resolve();
  }
}

