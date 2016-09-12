'use strict';

describe('Validator suite', function() {
  require('../bootstrap');

  let Validator = require('insulin').get('Validator');
  let v = new Validator();

  it('checks that a variable is a string.', function() {
    expect(v.isString('asdf')).toBe(true);
    expect(v.isString('')).toBe(true);
    expect(v.isString(12)).toBe(false);
  });

  it('checks that a string is not blank.', function() {
    expect(v.isNotBlank('asdf')).toBe(true);
    expect(v.isNotBlank(' ')).toBe(true);
    expect(v.isNotBlank('')).toBe(false);
    expect(v.isNotBlank(12)).toBe(true);
  });

  it('checks that a string is a phone number.', function() {
    expect(v.isPhone('916-222-3333')).toBe(true);
    expect(v.isPhone('916-222-3333 ext. 22')).toBe(true);
    expect(v.isPhone('916')).toBe(false);
    expect(v.isPhone('')).toBe(false);
    expect(v.isPhone(12)).toBe(false);
  });

  it('checks that a string is an email address.', function() {
    expect(v.isEmail('test@test.com')).toBe(true);
    expect(v.isEmail('a@b.c')).toBe(true);
    expect(v.isEmail('user.name@sub.domain.com')).toBe(true);
    expect(v.isEmail('asdf')).toBe(false);
    expect(v.isEmail('')).toBe(false);
    expect(v.isEmail(12)).toBe(false);
  });

  it('checks that a string is a zip code.', function() {
    expect(v.isZip('12345')).toBe(true);
    expect(v.isZip('12345-6789')).toBe(true);
    expect(v.isZip('1234')).toBe(false);
    expect(v.isZip('12345-99999')).toBe(false);
    expect(v.isZip('asdf')).toBe(false);
    expect(v.isZip('')).toBe(false);
    expect(v.isZip(12)).toBe(false);
    expect(v.isZip(12345)).toBe(false);
  });

  it('checks that a number is an int.', function() {
    expect(v.isInteger('12345')).toBe(true);
    expect(v.isInteger(12345)).toBe(true);
    expect(v.isInteger('12345.0')).toBe(true);
    expect(v.isInteger(12345.0)).toBe(true);
    expect(v.isInteger(12345.1)).toBe(false);
    expect(v.isInteger('12345.1')).toBe(false);
    expect(v.isInteger(-1)).toBe(true);
    expect(v.isInteger('-1')).toBe(true);
    expect(v.isInteger('0')).toBe(true);
    expect(v.isInteger(0)).toBe(true);
    expect(v.isInteger({})).toBe(false);
    expect(v.isInteger([])).toBe(false);
  });

  it('checks that a value meets a minimum length.', function() {
    expect(v.minLength('12345', -1)).toBe(true);
    expect(v.minLength('12345', 0)).toBe(true);
    expect(v.minLength('12345', 1)).toBe(true);
    expect(v.minLength('12345', 2)).toBe(true);
    expect(v.minLength('12345', 3)).toBe(true);
    expect(v.minLength('12345', 4)).toBe(true);
    expect(v.minLength('12345', 5)).toBe(true);
    expect(v.minLength('12345', 6)).toBe(false);
    expect(v.minLength(12345, 5)).toBe(true);
  });

  it('checks that a value meets a maximum length.', function() {
    expect(v.maxLength('12345', -1)).toBe(false);
    expect(v.maxLength('12345', 0)).toBe(false);
    expect(v.maxLength('12345', 1)).toBe(false);
    expect(v.maxLength('12345', 2)).toBe(false);
    expect(v.maxLength('12345', 3)).toBe(false);
    expect(v.maxLength('12345', 4)).toBe(false);
    expect(v.maxLength('12345', 5)).toBe(true);
    expect(v.maxLength('12345', 6)).toBe(true);
    expect(v.maxLength(12345, 4)).toBe(false);
    expect(v.maxLength(12345, 5)).toBe(true);
  });

  it('checks that a key is in an object.', function() {
    expect(v.keyExists({foo: 'bar'}, 'foo')).toBe(true);
    expect(v.keyExists({baz: 'bar'}, 'foo')).toBe(false);
    expect(v.keyExists({}, 'foo')).toBe(false);
    expect(v.keyExists(12, 'foo')).toBe(false);
    expect(v.keyExists('foo', 'foo')).toBe(false);
  });

  it('checks the defined function.', function() {
    let a;
    expect(v.isDefined(a)).toBe(false);
    a = null;
    expect(v.isDefined(a)).toBe(true);
    a = 'asdf';
    expect(v.isDefined(a)).toBe(true);
  });

  it('checks the undefined function.', function() {
    let a;
    expect(v.isNotDefined(a)).toBe(true);
    a = null;
    expect(v.isNotDefined(a)).toBe(false);
    a = 'asdf';
    expect(v.isNotDefined(a)).toBe(false);
  });

  it('checks the iso 8601 date validation.', function() {
    expect(v.isISO8601Date('')).toBe(false);
    expect(v.isISO8601Date([])).toBe(false);
    expect(v.isISO8601Date('9/19/1983')).toBe(false);
    expect(v.isISO8601Date('1983-09-19T04:05:06.999Z')).toBe(true);
  });

  it('checks the notNull validation.', function() {
    expect(v.notNull('asdf')).toBe(true);
    expect(v.notNull(undefined)).toBe(true);
    expect(v.notNull(null)).toBe(false);
  });
});

