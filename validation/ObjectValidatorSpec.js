'use strict';

describe('ObjectValidator suite', function() {
  require('../bootstrap');

  const ObjectValidator = require('insulin').get('ObjectValidator');

  it('checks for defined keys.', function() {
    const ov = new ObjectValidator({
      name: 'asdf',
      empt: '',
      n: null,
      num: 4
    });

    ov.key('name').defined()
      .key('empt').defined()
      .key('n').defined()
      .key('num').defined()
      .key('nope').defined()
      .validate();
    expect(ov.isValid()).toBe(false);

    const errors = ov.getErrors();
    expect(errors.length).toBe(1);
    expect(errors[0].message).toBe('nope is required.');
    expect(errors[0].field).toBe('nope');
  });

  it('checks that fields are nullable by default.', function() {
    const ov = new ObjectValidator({
      name: null,
      age: null
    });

    ov.key('name').string()
      .key('age').integer()
      .validate();

    expect(ov.isValid()).toBe(true);
  });

  it('checks that non-nullable fields cannot be null.', function() {
    const ov = new ObjectValidator({
      name: null,
      age: null
    });

    ov.key('name').notNull().string()
      .key('age').notNull().integer()
      .validate();

    expect(ov.isValid()).toBe(false);

    const errors = ov.getErrors();
    expect(errors.length).toBe(2);
    expect(errors[0].message).toBe('name cannot be null.');
    expect(errors[1].message).toBe('age cannot be null.');
  });

  it('checks the getErrorList method.', function() {
    const ov = new ObjectValidator({num: 'asdf'});
    ov.key('n').defined()
      .key('num').integer()
      .validate();

    const errList = ov.getErrorList();

    expect(errList.errors.length).toBe(2);
    expect(errList.message).toBe('Validation errors occurred.');
    expect(errList.code).toBe('VAL_ERROR_LIST');
    expect(errList.name).toBe('ValidationErrorList');
  });

  it('checks that validate\'s promise returns correctly.', function() {
    let model = {num: 1};
    let ov    = new ObjectValidator(model);

    ov.key('num').integer()
      .validate()
      .then(res => expect(res).toBe(model))
      .catch(() => expect(true).toBe(false));

    model = {num: 'asdf'};
    ov    = new ObjectValidator(model);

    ov.key('num').integer()
      .validate()
      .then(() => expect(true).toBe(false))
      .catch(errList => {
        expect(errList.errors.length).toBe(1);
        expect(errList.message).toBe('Validation errors occurred.');
        expect(errList.code).toBe('VAL_ERROR_LIST');
        expect(errList.name).toBe('ValidationErrorList');
      });
  });

  it('checks that a variable is a string.', function() {
    const ov = new ObjectValidator({
      name: 'asdf',
      empt: '',
      num: 4,
      other: null
    });

    ov.key('name').defined().string()
      .key('nope').string() // Not required.
      .key('empt').defined().string()
      .key('num').defined().string()
      .key('other').string()
      .validate();
    expect(ov.isValid()).toBe(false);

    const errors = ov.getErrors();
    expect(errors.length).toBe(1);
    expect(errors[0].message).toBe('num is not a string.');
    expect(errors[0].field).toBe('num');
  });

  it('checks that a valiable is not a blank string.', function() {
    const ov = new ObjectValidator({
      name: 'asdf',
      profession: '',
      notes: null,
      other: 123
    });

    ov.key('name').notBlank()
      .key('profession').notBlank()
      .key('notes').notBlank()
      .key('other').notBlank()
      .validate();

    const errors = ov.getErrors();
    expect(errors.length).toBe(1);
    expect(errors[0].message).toBe('profession cannot be blank.');
    expect(errors[0].field).toBe('profession');
  });

  it('checks that a variable is an email.', function() {
    const ov = new ObjectValidator({
      name: 'asdf',
      email: 'asdf@asdf.com',
      empt: '',
      other: '',
      num: 4
    });

    ov.key('email').defined().email()
      .key('other').email()
      .key('other2').email()
      .key('name').defined().email()
      .key('empt').defined().email()
      .key('num').defined().email()
      .validate();
    expect(ov.isValid()).toBe(false);

    const errors = ov.getErrors();
    expect(errors.length).toBe(4);
    expect(errors[0].message).toBe('other is not a valid email address.');
    expect(errors[0].field).toBe('other');
    expect(errors[1].message).toBe('name is not a valid email address.');
    expect(errors[1].field).toBe('name');
    expect(errors[2].message).toBe('empt is not a valid email address.');
    expect(errors[2].field).toBe('empt');
    expect(errors[3].message).toBe('num is not a valid email address.');
    expect(errors[3].field).toBe('num');
  });

  it('checks that a variable is a phone number.', function() {
    const ov = new ObjectValidator({
      name: 'asdf',
      phone: '916-221-3110',
      phone2: '(916) 221-3110',
      office: '916-221-3110 ext. 19',
      office2: '916',
      otherOff: '916',
      otherOff2: '',
      otherOff3: null,
      num: 4
    });

    ov.key('name').defined().phone() // Not phone.
      .key('phone').defined().phone()
      .key('phone2').defined().phone()
      .key('office').defined().phone()
      .key('office2').defined().phone() // Incomplete.
      .key('otherOff').phone() // Incomplete.
      .key('otherOff2').phone()
      .key('otherOff3').phone()
      .key('num').phone() // Int.
      .validate();
    expect(ov.isValid()).toBe(false);

    const errors = ov.getErrors();
    expect(errors.length).toBe(5);
    expect(errors[0].message).toBe('name is not a valid phone number.');
    expect(errors[0].field).toBe('name');
    expect(errors[1].message).toBe('office2 is not a valid phone number.');
    expect(errors[1].field).toBe('office2');
    expect(errors[2].message).toBe('otherOff is not a valid phone number.');
    expect(errors[2].field).toBe('otherOff');
    expect(errors[3].message).toBe('otherOff2 is not a valid phone number.');
    expect(errors[3].field).toBe('otherOff2');
    expect(errors[4].message).toBe('num is not a valid phone number.');
    expect(errors[4].field).toBe('num');
  });

  it('checks that a minimum length is met.', function() {
    const ov = new ObjectValidator({
      name: '12345',
      num: 12345,
      other: ''
    });

    ov.key('name').defined().minLength(6) // 5.
      .key('num').defined().minLength(5)
      .key('other').minLength(1)
      .validate();
    expect(ov.isValid()).toBe(false);

    const errors = ov.getErrors();
    expect(errors.length).toBe(2);
    expect(errors[0].message).toBe('name must be at least 6 characters long.');
    expect(errors[0].field).toBe('name');
    expect(errors[1].message).toBe('other must be at least 1 characters long.');
    expect(errors[1].field).toBe('other');
  });

  it('checks that a maximum length is met.', function() {
    const ov = new ObjectValidator({
      name: '12345',
      num: 12345
    });

    ov.key('name').defined().maxLength(4)
      .key('num').defined().maxLength(5)
      .validate();
    expect(ov.isValid()).toBe(false);

    const errors = ov.getErrors();
    expect(errors.length).toBe(1);
    expect(errors[0].message).toBe('name must be at most 4 characters long.');
    expect(errors[0].field).toBe('name');
  });

  it('checks the integer validator.', function() {
    const ov = new ObjectValidator({
      name: 'Joe',
      age: 12345
    });

    ov.key('name').defined().integer()
      .key('age').defined().integer()
      .validate();
    expect(ov.isValid()).toBe(false);

    const errors = ov.getErrors();
    expect(errors.length).toBe(1);
    expect(errors[0].message).toBe('name is not a valid integer.');
    expect(errors[0].field).toBe('name');
  });

  it('checks that a key is defined.', function() {
    let ov = new ObjectValidator({});
    ov.key('userID').defined().validate();
    expect(ov.getErrors().length).toBe(1);
    expect(ov.getErrors()[0].field).toBe('userID');
    expect(ov.getErrors()[0].message).toBe('userID is required.');
    expect(ov.getErrors()[0].code).toBe('VAL_REQ');

    ov = new ObjectValidator({userID: 42});
    ov.key('userID').defined().validate();
    expect(ov.getErrors().length).toBe(0);
  });

  it('checks prohibited keys.', function() {
    let ov = new ObjectValidator({userID: 12});
    ov.key('userID').notDefined().validate();
    expect(ov.getErrors().length).toBe(1);
    expect(ov.getErrors()[0].field).toBe('userID');
    expect(ov.getErrors()[0].message).toBe('userID is prohibited.');
    expect(ov.getErrors()[0].code).toBe('VAL_NOT_DEFINED');

    ov = new ObjectValidator({});
    ov.key('userID').notDefined().validate();
    expect(ov.getErrors().length).toBe(0);
  });

  it('checks iso 8601 dates.', function() {
    let ov = new ObjectValidator({gameStart: '2016-06-17T00:48:01.922Z'});
    ov.key('gameStart').iso8601().validate();
    expect(ov.isValid()).toBe(true);

    ov = new ObjectValidator({gameStart: '2016-06-17'});
    ov.key('gameStart').iso8601().validate();
    expect(ov.isValid()).toBe(false);
    expect(ov.getErrors()[0].message).toBe('gameStart must be a valid ISO8601 date in the format YYYY-MM-DDTHH:mm:ss.sssZ.');
  });

  it('checks nonNullable values.', function() {
    let ov = new ObjectValidator({userID: 12});
    ov.key('userID').notNull().validate();
    expect(ov.isValid()).toBe(true);

    ov = new ObjectValidator({userID: null});
    ov.key('userID').notNull().validate();
    expect(ov.isValid()).toBe(false);
    expect(ov.getErrors()[0].message).toBe('userID cannot be null.');
  });
});

