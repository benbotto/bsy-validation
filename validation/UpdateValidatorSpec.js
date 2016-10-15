'use strict';

describe('UpdateValidator suite', function() {
  require('../bootstrap');

  const insulin         = require('insulin');
  const UpdateValidator = insulin.get('UpdateValidator');
  const Database        = insulin.get('ndm').Database;
  const dbSchema        = {
    name: 'disc_golf_tracker',
    tables: [{
      name: 'widgets',
      columns: [{
        name: 'widgetID',
        dataType: 'int',
        isPrimary: true
      }]
    }]
  };
  const db = new Database(dbSchema);

  // Checks that the primary key is required on update.
  it('checks that the primary key is required on update.', function() {
    let model = {widgetID: 42};
    let mv    = new UpdateValidator(model, 'widgets', db);

    mv.validate();
    expect(mv.isValid()).toBe(true);

    model = {};
    mv    = new UpdateValidator(model, 'widgets', db);
    mv.validate();
    expect(mv.getErrors()[0].message).toBe('widgetID is required.');
  });
});

