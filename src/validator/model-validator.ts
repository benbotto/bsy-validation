import { metaFactory, ColumnMetadata } from 'formn';

import {
  Validator, StringValidator, MaxLengthValidator, IntValidator,
  NumberValidator, DateValidator, BooleanValidator, NotNullValidator
} from './';
import { ValidationMetadata } from '../decorator/';

/**
 * This class is used to validate Formn models.
 */
export abstract class ModelValidator {
  /**
   * Validate an object as an Entity.  The [[ObjectValidator]] is used to do
   * the underlying validation, but this class also checks the object against
   * Formn's metadata.
   * @param obj - The object to validate against class Entity.
   * @param Entity - A class that has properties decorated with @Validate.
   * This is the schema against which obj will be validated.
   */
  abstract validate(
    obj: object,
    Entity: {new(): any}): Promise<void>;

  /**
   * Generate [[ValidationMetadata]] for the Entity.
   */
  getValidationMetadata(Entity: {new(): any}): ValidationMetadata[] {
    const colMeta = metaFactory
      .getColumnStore()
      .getColumnMetadata(Entity);

    return colMeta
      .map((meta: ColumnMetadata) => {
        const validators: Validator[] = [];

        // Datatype validation.
        switch (meta.dataType) {
          case 'String':
            validators.push(new StringValidator());
            
            if (meta.maxLength !== undefined)
              validators.push(new MaxLengthValidator(meta.maxLength));
            break;

          case 'Date':
            validators.push(new DateValidator());
            break;

          case 'Number':
            switch (meta.sqlDataType) {
              case 'int':
              case 'smallint':
              case 'mediumint':
              case 'bigint':
                validators.push(new IntValidator());
                break;

              default:
                validators.push(new NumberValidator());
                break;
            }

            break;

          case 'Boolean':
            validators.push(new BooleanValidator());
            break;
        }

        // Null validation.
        if (meta.isNullable === false)
          validators.push(new NotNullValidator());

        return new ValidationMetadata(Entity, meta.mapTo, validators);
      });
  }
}

