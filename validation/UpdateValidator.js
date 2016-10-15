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

      const pkAlias = database
        .getTableByAlias(tableAlias)
        .getPrimaryKey()[0]
        .getAlias();

      // Primary key must be present on an update.
      this.key(pkAlias).defined();
    }
  }

  return UpdateValidator;
});

