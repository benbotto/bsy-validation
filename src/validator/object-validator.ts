import { ValidationErrorList, ValidationError } from 'bsy-error';

import { validationFactory } from '../';

/**
 * Class used for validating an object against a set of constraints defined on
 * a class.
 */
export class ObjectValidator {
  /**
   * Validate an object as an Entity.
   */
  async validate(obj: object, Entity: {new(): any}): Promise<void> {
    const valMetas = validationFactory.getMetadata(Entity);
    const errorList = new ValidationErrorList();

    // Because the @Constraint decorator is a factory, the validators are added
    // to the ValidationFactory in reverse order.  Here the validators are
    // called in order, top to bottom.  See
    // https://www.typescriptlang.org/docs/handbook/decorators.html#decorator-composition
    for (let i = valMetas.length - 1; i >= 0; --i) {
      const valMeta   = valMetas[i];
      const validator = valMeta.validator;
      const value     = (obj as {[key: string]: any})[valMeta.propName];

      // The validator can return a boolean, or a Promise that's resolved when valid,
      // rejected when invalid.
      let valid;

      try {
        valid = await validator.validate(value);
      }
      catch (err) {
        valid = false;
      }

      if (!valid) {
        errorList
          .addError(new ValidationError(
            validator.getErrorMessage(valMeta.propName), valMeta.propName));
      }
    }

    if (errorList.errors.length)
      return Promise.reject(errorList);
    return Promise.resolve();
  }
}

