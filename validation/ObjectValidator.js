'use strict';

require('insulin')
  .factory('ObjectValidator',
  function(deferred, Validator, ValidationError, ValidationErrorList) {
    class ObjectValidator {
      /**
       * Class for validating an object.
       * @param obj The object to validate.
       */
      constructor(obj) {
        this._obj        = obj;
        this._validator  = new Validator();
        this._fields     = {};
        this._curKey     = null;
        this._errors     = [];
      }

      /**
       * Get the array of errors, which shall be empty if the previous
       * validate() call found no validation errors.
       */
      getErrors() {
        return this._errors;
      }

      /**
       * Check if the model is valid.
       */
      isValid() {
        return this._errors.length === 0;
      }

      /**
       * Short-hand method that gets a ValidationErrorList instance containing
       * the list of errors.  If there are no errors then null is returned.
       */
      getErrorList() {
        return new ValidationErrorList(this.getErrors());
      }

      /**
       * Validate the object and return a promise.  The promise is resolved
       * with the model if the model is valid, otherwise it is rejected with a
       * ValidationErrorList instance.
       */
      validate() {
        this._errors.length = 0;

        for (let fieldName in this._fields) {
          const field = this._fields[fieldName];

          // Validate the field if it is defined.
          if (this._validator.keyExists(this._obj, fieldName)) {
            // If the field is nullable and null, then it's valid.
            if (!field.nullable || this._obj[fieldName] !== null) {
              field.validators.every(val => { /*jshint ignore:line*/
                // Call the validator passing: 
                // 1. The value in obj.
                // 2. Any extra arguments (e.g. maxLength needs an argument).
                if (val.validator.apply(this._validator, [this._obj[fieldName]].concat(val.arguments)) === false) {
                  this._errors.push(new ValidationError(val.message, val.code, fieldName));
                  return false;
                }

                return true;
              });
            }
          }
          // Otherwise the key is not defined.  If it's required then the field
          // is invalid.
          else if (field.required) {
            this._errors.push(
              new ValidationError(fieldName + ' is required.', 'VAL_REQ', fieldName));
          }
        }

        return this.isValid() ?
          deferred.resolve(this._obj) :
          deferred.reject(this.getErrorList());
      }

      /**
       * Set the current key.
       */
      key(key) {
        this._curKey = key;

        if (!this._validator.keyExists(this._fields, this._curKey)) {
          this._fields[this._curKey] = {
            validators: [],
            required:   false,
            nullable:   true
          };
        }

        return this;
      }

      /**
       * Throw if the key is not set.
       */
      checkKey() {
        if (typeof this._curKey !== 'string')
          throw new Error('Key not set.');
      }

      /**
       * Make sure that the key is present.
       */
      defined() {
        this.checkKey();
        this._fields[this._curKey].required = true;
        return this;
      }

      /**
       * Make sure that the key is not present.
       */
      notDefined() {
        this.checkKey();
        this._fields[this._curKey].validators.push({
          validator: this._validator.isNotDefined,
          message:   this._curKey + ' is prohibited.',
          code:      'VAL_NOT_DEFINED'
        });
        return this;
      }

      /**
       * Checks that the current key is not null.
       */
      notNull() {
        this.checkKey();
        this._fields[this._curKey].nullable = false;
        this._fields[this._curKey].validators.push({
          validator: this._validator.notNull,
          message:   this._curKey + ' cannot be null.',
          code:      'VAL_NOT_NULL'
        });
        return this;
      }

      /**
       * Validate the current key as a string.
       */
      string() {
        this.checkKey();
        this._fields[this._curKey].validators.push({
          validator: this._validator.isString,
          message:   this._curKey + ' is not a string.',
          code:      'VAL_NSTR',
          arguments: []
        });
        return this;
      }

      /**
       * Make sure that the current key is not a blank string.
       */
      notBlank() {
        this.checkKey();
        this._fields[this._curKey].validators.push({
          validator: this._validator.isNotBlank,
          message:   this._curKey + ' cannot be blank.',
          code:      'VAL_NSTR',
          arguments: []
        });
        return this;
      }

      /**
       * Validate the current key as an email address.
       */
      email() {
        this.checkKey();
        this._fields[this._curKey].validators.push({
          validator: this._validator.isEmail,
          message:   this._curKey + ' is not a valid email address.',
          code:      'VAL_EML',
          arguments: []
        });
        return this;
      }

      /**
       * Validate current key as a phone number.
       */
      phone() {
        this.checkKey();
        this._fields[this._curKey].validators.push({
          validator: this._validator.isPhone,
          message:   this._curKey + ' is not a valid phone number.',
          code:      'VAL_PHN',
          arguments: []
        });
        return this;
      }

      /**
       * Validate current key for a minimum length.
       * @param len The minimum length.
       */
      minLength(len) {
        this.checkKey();
        this._fields[this._curKey].validators.push({
          validator: this._validator.minLength,
          message:   this._curKey + ' must be at least ' + len + ' characters long.',
          code:      'VAL_MIN',
          arguments: [len]
        });
        return this;
      }

      /**
       * Validate current key for a maximum length.
       * @param len The minimum length.
       */
      maxLength(len) {
        this.checkKey();
        this._fields[this._curKey].validators.push({
          validator: this._validator.maxLength,
          message:   this._curKey + ' must be at most ' + len + ' characters long.',
          code:      'VAL_MAX',
          arguments: [len]
        });
        return this;
      }

      /**
       * Validate the current key as an integer.
       */
      integer() {
        this.checkKey();
        this._fields[this._curKey].validators.push({
          validator: this._validator.isInteger,
          message:   this._curKey + ' is not a valid integer.',
          code:      'VAL_INTEGER'
        });
        return this;
      }

      /**
       * Validates current key as float
       */
      float() {
        this.checkKey();
        this._fields[this._curKey].validators.push({
          validator: this._validator.isFloat,
          message:   this._curKey + ' is not a valid float.',
          code:      'VAL_FLOAT'
        });
        return this;
      }

      /**
       * Validates current key as number
       */
      number() {
        this.checkKey();
        this._fields[this._curKey].validators.push({
          validator: this._validator.isNumber,
          message:   this._curKey + ' is not a valid number.',
          code:      'VAL_NUMBER'
        });
        return this;
      }

      /**
       * Checks that the current key is a valid ISO8601 date.
       */
      iso8601() {
        this.checkKey();
        this._fields[this._curKey].validators.push({
          validator: this._validator.isISO8601Date,
          message:   this._curKey + ' must be a valid ISO8601 date in the format ' +
                     'YYYY-MM-DDTHH:mm:ss.sssZ.',
          code:      'VAL_ISO8601'
        });
        return this;
      }

      /**
       * Validates the current key as a boolean
       */
      boolean() {
        this.checkKey();
        this._fields[this._curKey].validators.push({
          validator: this._validator.isBoolean,
          message:   this._curKey + ' must be true or false.',
          code:      'VAL_BOOLEAN'
        });
        return this;
      }

      /**
       * Validates the current key as a bit
       */
      bit() {
        this.checkKey();
        this._fields[this._curKey].validators.push({
          validator: this._validator.isBit,
          message:   this._curKey + ' must be 0 or 1.',
          code:      'VAL_BIT'
        });
        return this;
      }
    }

    return ObjectValidator;
  });

