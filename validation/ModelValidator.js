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
     * of type tableAlias (a table alias) against database.
     * @param model The object to validate.
     * @param tableAlias The alias of the table to which model belongs.
     * @param database An ndm.Database instance.
     */
    constructor(model, tableAlias, database) {
      super(model);

      database.getTableByAlias(tableAlias).getColumns().forEach(col => {
        // Validating the current column, by alias.
        this.key(col.getAlias());

        if (!col.isNullable())
          this.notNull();

        switch (col.getDataType()) {
          case 'int':
            this.integer();
            break;
          case 'varchar':
          case 'nvarchar':
          case 'text':
            // Note: Even though searching on blank strings is a valid
            // operation, in this application blank strings are disallowed.
            this.string().notBlank();
            if (col.getMaxLength())
              this.maxLength(col.getMaxLength());
            break;
          case 'timestamp':
          case 'datetime':
            this.iso8601();
            break;
          default:
            break;
        }
      });
    }
  }

  return ModelValidator;
});

