'use strict';

require('insulin').factory('DeleteValidator', function(ModelValidator) {
  /**
   * Specialized validator for deletes.
   */
  class DeleteValidator extends ModelValidator {
    /**
     * Initialize the validator.  The validator will validate a model
     * of type tableAlias (a table alias) against database and ensure that
     * the primary key is supplied.  All other properties are ignored.
     * @param model The object to validate.
     * @param tableAlias The alias of the table to which model belongs.
     * @param database An ndm.Database instance.
     */
    constructor(model, tableAlias, database) {
      super(model, tableAlias, database);
    }

    /**
     * Override the validation initialization and only validate the PK.
     * @param col The database Column instance for which validation constraints
     *        should be initialized.
     */
    setColumnValidation(col) {
      if (col.isPrimary()) {
        // Only validate the PK.  (This also sets this.key(col.getAlias()).
        super.setColumnValidation(col);

        // PK must be present. 
        this.defined();
      }
    }
  }

  return DeleteValidator;
});

