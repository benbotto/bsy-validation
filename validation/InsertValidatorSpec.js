'use strict';

describe('InsertValidator suite', function() {
  require('../bootstrap');

  let insulin         = require('insulin');
  let InsertValidator = insulin.get('InsertValidator');
  let Database        = insulin.get('ndm').Database;
  let dbSchema        = {
    name: 'disc_golf_tracker',
    tables: [{
      name: 'widgets',
      columns: [
        {
          name: 'widgetID',
          dataType: 'int',
          isPrimary: true
        },
        {
          name: 'name',
          dataType: 'varchar',
          isNullable: false
        }
      ]
    }]
  };
  let db = new Database(dbSchema);

  it('checks that the primary key is not allowed on insert.', function() {
    let model = {widgetID: 42, name: 'joe'};
    let mv    = new InsertValidator(model, 'widgets', db);

    mv.validate()
      .then(() => expect(true).toBe(false))
      .catch(errList => expect(errList.errors[0].message).toBe('widgetID is prohibited.'));

    model = {name: 'joe'};
    mv    = new InsertValidator(model, 'widgets', db);
    mv.validate();
    expect(mv.isValid()).toBe(true);
  });

  it('checks the required validation.', function() {
    let model, mv;

    model = {};
    mv = new InsertValidator(model, 'widgets', db);
    mv.validate()
      .then(() => expect(true).toBe(false))
      .catch(errList => expect(errList.errors[0].message).toBe('name is required.'));

    model = {name: ''};
    mv = new InsertValidator(model, 'widgets', db);
    mv.validate()
      .then(() => expect(true).toBe(false))
      .catch(errList => expect(errList.errors[0].message).toBe('name cannot be blank.'));

    model = {name: null};
    mv = new InsertValidator(model, 'widgets', db);
    mv.validate()
      .then(() => expect(true).toBe(false))
      .catch(errList => expect(errList.errors[0].message).toBe('name cannot be null.'));
  });
});

