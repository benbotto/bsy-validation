import { ValidationMetadata } from './';

class ValidationFactory {
  private classValidators: Map<{new(): any}, ValidationMetadata[]> = new Map();

  /**
   * Clear the metadata (useful in unit tests).
   */
  clear(): this {
    this.classValidators.clear();

    return this;
  }

  /**
   * Add a validator to a class.
   */
  addMetadata(meta: ValidationMetadata): this {
    if (!this.classValidators.has(meta.Entity))
      this.classValidators.set(meta.Entity, []);

    this.classValidators
      .get(meta.Entity)
      .push(meta);

    return this;
  }

  /**
   * Get the validation metadata for an entity (class).  The returned array of
   * ValidationMeta will be empty if the class has no constraints in place.
   */
  getMetadata(Entity: {new(): any}): ValidationMetadata[] {
    if (!this.classValidators.has(Entity))
      return [];
    return this.classValidators.get(Entity);
  }
}

export default new ValidationFactory();

