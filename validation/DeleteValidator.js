'use strict';

require('insulin').factory('DeleteValidator', function(ModelValidator) {
  /**
   * Specialized validator for deletes.
   */
  class DeleteValidator extends ModelValidator {
    /**
     * Initialize the validator.  The validator will validate a model
     * of type tableMapping (a table maping) against database and ensure that
     * the primary key is supplied.  All other properties are ignored.
     * @param {Object} model - The object to validate.
     * @param {string} tableMapping - The mapping (mapTo property) of the table to which
     * model belongs.
     * @param {Database} database - An ndm.Database instance.
     */
    constructor(model, tableMapping, database) {
      super(model, tableMapping, database);
    }

    /**
     * Override the validation initialization and only validate the PK.
     * @param {Column} col - The database Column instance for which validation
     * constraints should be initialized.
     */
    setColumnValidation(col) {
      if (col.isPrimary) {
        // Only validate the PK.  (This also sets this.key(col.mapTo).
        super.setColumnValidation(col);

        // PK must be present. 
        this.defined();
      }
    }
  }

  return DeleteValidator;
});

