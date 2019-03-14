import { Validator } from '../validator/';

/**
 * Holds metadata for a class's validation on a property.
 */
export class ValidationMetadata {
  /**
   * Init.
   * @param Entity - The Entity to validate.
   * @param propName - The property on Entity to validate.
   * @param validator - The Validator instance to apply to Entity[propName].
   */
  constructor(
    public Entity: {new(): any},
    public propName: string,
    public validator: Validator) {
  }
}

