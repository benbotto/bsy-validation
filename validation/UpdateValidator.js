'use strict';

require('insulin').factory('UpdateValidator', function(ModelValidator) {
  /**
   * Specialization of the model validator for update/delete.
   */
  class UpdateValidator extends ModelValidator {
    /**
     * Initialize the validator.  The validator will validate a model
     * of type tableAlias (a table alias) against database.
     * @param model The object to validate.
     * @param tableAlias The alias of the table to which model belongs.
     * @param database An ndm.Database instance.
     */
    constructor(model, tableAlias, database) {
      super(model, tableAlias, database);
    }

    /**
     * Override the validation initialization and ensure that the primary key
     * is defined.
     * @param col The database Column instance for which validation constraints
     *        should be initialized.
     */
    setColumnValidation(col) {
      // This calls this.key(col.getAlias()) so the key is set.
      super.setColumnValidation(col);

      // Primary key must be present.
      if (col.isPrimary())
        this.defined();
    }
  }

  return UpdateValidator;
});

