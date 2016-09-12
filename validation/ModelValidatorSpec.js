'use strict';

describe('ModelValidator suite', function() {
  require('../bootstrap');

  let insulin        = require('insulin');
  let ModelValidator = insulin.get('ModelValidator');
  let Database       = insulin.get('ndm').Database;
  let dbSchema = {
    name: 'disc_golf_tracker',
    tables: [
      {
        name: 'widgets',
        columns: [
          {
            name: 'widgetID',
            dataType: 'int',
            isPrimary: true
          }
        ]
      },
      {
        name: 'people',
        columns: [
          {
            name: 'personID',
            dataType: 'int',
            isPrimary: true
          },
          {
            name: 'name',
            dataType: 'varchar',
            isNullable: false,
            maxLength: 10
          },
          {
            name: 'age',
            dataType: 'int'
          },
          {
            name: 'lastSeen',
            dataType: 'timestamp'
          }
        ]
      }
    ]
  };
  let db = new Database(dbSchema);

  it('checks that non-null fields cannot be null.', function() {
    let model = {name: null};
    let mv    = new ModelValidator(model, 'people', db);
    mv.validate();
    expect(mv.isValid()).toBe(false);
    expect(mv.getErrors()[0].message).toBe('name cannot be null.');
  });

  it('checks the integer validation.', function() {
    let model = {name: 'Joe', age: 32};
    let mv    = new ModelValidator(model, 'people', db);
    mv.validate();
    expect(mv.isValid()).toBe(true);

    model = {name: 'Joe', age: 'asdf'};
    mv    = new ModelValidator(model, 'people', db);

    mv.validate()
      .then(() => expect(true).toBe(false))
      .catch(errList => {
        expect(errList.errors[0].message).toBe('age is not a valid integer.');
      });
  });

  it('checks the string validation.', function() {
    let model = {name: 26};
    let mv    = new ModelValidator(model, 'people', db);
    mv.validate();
    expect(mv.isValid()).toBe(false);
    expect(mv.getErrors()[0].message).toBe('name is not a string.');

    model = {name: ''};
    mv    = new ModelValidator(model, 'people', db);
    mv.validate();
    expect(mv.isValid()).toBe(false);
    expect(mv.getErrors()[0].message).toBe('name cannot be blank.');
  });

  it('checks the max length validation.', function() {
    let model = {name: '0123456789'};
    let mv    = new ModelValidator(model, 'people', db);
    mv.validate();
    expect(mv.isValid()).toBe(true);

    model = {name: '0123456789A'};
    mv    = new ModelValidator(model, 'people', db);
    mv.validate();
    expect(mv.isValid()).toBe(false);
    expect(mv.getErrors()[0].message).toBe('name must be at most 10 characters long.');
  });

  it('checks the date validation.', function() {
    let model = {name: 'Jim Bob', lastSeen: '2016-06-17T00:48:01.922Z'};
    let mv    = new ModelValidator(model, 'people', db);
    mv.validate();
    expect(mv.isValid()).toBe(true);

    model = {name: 'Jim Bob', lastSeen: '2016-06-17'};
    mv    = new ModelValidator(model, 'people', db);
    mv.validate();
    expect(mv.isValid()).toBe(false);
    expect(mv.getErrors()[0].message)
      .toBe('lastSeen must be a valid ISO8601 date in the format YYYY-MM-DDTHH:mm:ss.sssZ.');
  });
});

