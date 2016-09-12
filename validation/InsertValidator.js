'use strict';

require('insulin').factory('InsertValidator', function(ModelValidator) {
  /**
   * Specialization of the model validator for insertion.
   */
  class InsertValidator extends ModelValidator {
    /**
     * Initialize the validator.  The validator will validate a model
     * of type tableAlias (a table alias) against database.
     * @param model The object to validate.
     * @param tableAlias The alias of the table to which model belongs.
     * @param database An ndm.Database instance.
     */
    constructor(model, tableAlias, database) {
      super(model, tableAlias, database);

      let table   = database.getTableByAlias(tableAlias);
      let pkAlias = table.getPrimaryKey()[0].getAlias();

      // Primary key is not allowed on insert.
      this.key(pkAlias).notDefined();

      table.getColumns().forEach(col => {
        // If the column isn't nullalbe, it generally must be defined.  The
        // exceptions to the rule are: 1) The primary key, or 2) columns with
        // default values.  Note, however, that non-nullable fields can never
        // be null, which is enforced by ModelValidator.
        if (!col.isNullable() && !col.isPrimary() && !col.getDefaultValue())
          this.key(col.getAlias()).defined();
      });
    }
  }

  return InsertValidator;
});

