'use strict';

require('insulin').factory('ModelValidator', function(ObjectValidator) {
  /**
   * This class is an extension of the ObjectValidator that is specialized
   * for database models.  A ndm.Database instance is used to obtain model
   * details.
   */
  class ModelValidator extends ObjectValidator {
    /**
     * Initialize the validator.  The validator will validate a model
     * of type tableMapping (a table mapping) against database.
     * @param {Object} model - The object to validate.
     * @param {string} tableMapping - The mapping of the table to which model
     * belongs.
     * @param {Database} database - An ndm.Database instance.
     */
    constructor(model, tableMapping, database) {
      super(model);

      this.database     = database;
      this.tableMapping = tableMapping;

      database
        .getTableByMapping(tableMapping)
        .columns
        .forEach(col => this.setColumnValidation(col));
    }

    /**
     * Initialize the validation for column.
     * @param {Column} col The database Column instance for which validation
     * constraints should be initialized.
     */
    setColumnValidation(col) {
      // Validating the current column, by mapping.
      this.key(col.mapTo);

      if (!col.isNullable)
        this.notNull();

      switch (col.dataType) {
        case 'int':
          this.integer();
          break;
        case 'varchar':
        case 'nvarchar':
        case 'text':
          // Note: Even though searching on blank strings is a valid
          // operation, in this application blank strings are disallowed.
          this.string().notBlank();
          if (col.maxLength)
            this.maxLength(col.maxLength);
          break;
        case 'timestamp':
        case 'datetime':
          this.iso8601();
          break;
        default:
          break;
      }
    }
  }

  return ModelValidator;
});

