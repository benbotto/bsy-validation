'use strict';

require('insulin').factory('InsertValidator', function(ModelValidator) {
  /**
   * Specialization of the model validator for insertion.
   */
  class InsertValidator extends ModelValidator {
    /**
     * Initialize the validator.  The validator will validate a model
     * of type tableMapping (a table mapping) against database.
     * @param {Object} model - The object to validate.
     * @param {string} tableMapping - The mapping of the table to which model
     * belongs.
     * @param {Database} database - An ndm.Database instance.
     */
    constructor(model, tableMapping, database) {
      super(model, tableMapping, database);
    }

    /**
     * Override the validation initialization and ensure that each non-nullable
     * field is defined.  The exception is if there is a default value, or
     * if the column is a primary key.
     * @param {Column} col - The database Column instance for which validation
     * constraints should be initialized.
     */
    setColumnValidation(col) {
      // This calls this.key(col.mapTo) so the key is set.
      super.setColumnValidation(col);

      // If the column isn't nullalbe, it generally must be defined.  The
      // exceptions to the rule are: 1) The primary key, or 2) columns with
      // default values.  Note, however, that non-nullable fields can never
      // be null, which is enforced by ModelValidator.
      if (!col.isNullable && !col.isPrimary && !col.defaultValue)
        this.defined();

      // Primary key is not allowed on insert.
      if (col.isPrimary)
        this.notDefined();
    }
  }

  return InsertValidator;
});

