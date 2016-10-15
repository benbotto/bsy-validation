'use strict';

describe('DeleteValidator suite', function() {
  require('../bootstrap');

  const insulin         = require('insulin');
  const DeleteValidator = insulin.get('DeleteValidator');
  const Database        = insulin.get('ndm').Database;
  const dbSchema        = {
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
          name: 'widgetType',
          dataType: 'int',
          isNullable: false
        }
      ]
    }]
  };
  const db = new Database(dbSchema);

  // Checks that the primary key is required on delete.
  it('checks that the primary key is required on delete.', function() {
    let model = {widgetID: 42};
    let mv    = new DeleteValidator(model, 'widgets', db);

    mv.validate();
    expect(mv.isValid()).toBe(true);

    model = {};
    mv    = new DeleteValidator(model, 'widgets', db);
    mv.validate();
    expect(mv.getErrors()[0].message).toBe('widgetID is required.');
  });

  it('checks that the primary key is validated.', function() {
    let model = {widgetID: 'asdf'};
    let mv    = new DeleteValidator(model, 'widgets', db);

    mv.validate();
    expect(mv.getErrors()[0].message).toBe('widgetID is not a valid integer.');
  });

  it('checks that other model properties are ignored.', function() {
    console.log('---------------------------------------');
    let model = {widgetID: 42, widgetType: 'asdf'};
    let mv    = new DeleteValidator(model, 'widgets', db);

    mv.validate();
    expect(mv.isValid()).toBe(true);
  });
});

