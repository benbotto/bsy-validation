'use strict';

require('insulin').factory('Validator', function(moment) {
  /**
   * Provides basic validation.
   */
  class Validator {
    /**
     * Make sure val is a string.
     */
    isString(val) {
      return typeof(val) === 'string';
    }

    /**
     * Make sure that val not a blank string.
     */
    isNotBlank(val) {
      return val !== '';
    }

    /**
     * Make sure a phone number is valid (has at least 10 digits).
     */
    isPhone(val) {
      let phone;

      if (!this.isString(val))
        return false;

      phone = val.replace(/\D/g, '');

      return phone.length >= 10;
    }

    /**
     * Make sure an email address is valid.
     */
    isEmail(val) {
      if (!this.isString(val))
        return false;

      return val.match(/^\S+@\S+\.\S+$/) !== null;
    }

    /**
     * Make sure a zip code is valid.
     */
    isZip(val) {
      if (!this.isString(val))
        return false;

      return (val.match(/^\d{5}$/) !== null ||
        val.match(/^\d{5}-\d{4}$/) !== null);
    }

    /**
     * Make sure a number is an int.
     */
    isInteger(val) {
      const type = typeof val;
      return (type === 'number' || type === 'string') && Number(val) % 1 === 0;
    }

    /**
     * Make sure a number is a float.
     */
    isFloat(val) {
      return !isNaN(Number(val)) && Number(val) % 1 !== 0;
    }

    /**
     * Make sure value is a number.
     */
    isNumber(val) {
      return !isNaN(Number(val));
    }

    /**
     * Make sure a value is at least a certain length.
     */
    minLength(val, length) {
      return String(val).length >= length;
    }

    /**
     * Make sure a value is at most a certain length.
     */
    maxLength(val, length) {
      return String(val).length <= length;
    }

    /**
     * Check if key exists in the object.
     * @param obj The object within which to check for key.
     * @param key The key to look for in object.
     */
    keyExists(obj, key) {
      return obj[key] !== undefined;
    }

    /**
     * Check that val is defined.
     */
    isDefined(val) {
      return val !== undefined;
    }

    /**
     * Make sure val is undefined.
     */
    isNotDefined(val) {
      return val === undefined;
    }

    /**
     * Checks that a string is a date in the format: YYYY-MM-DDTHH:mm:ss.sssZ
     */
    isISO8601Date(val) {
      return moment(val, 'YYYY-MM-DDTHH:mm:ss.sssZ', true).isValid();
    }

    /**
     * Make sure that val is not null.
     */
    notNull(val) {
      return val !== null;
    }

    /**
     * Make sure value is boolean.
     */
    isBoolean(val) {
      return typeof val === 'boolean';
    }

    /**
     * Make sure value is bit.
     */
    isBit(val) {
      return val === 0 || val === 1 || val === '0' || val === '1';
    }
  }

  return Validator;
});

