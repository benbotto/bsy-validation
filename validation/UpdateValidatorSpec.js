'use strict';

describe('UpdateValidator suite', function() {
  require('../bootstrap');

  let insulin         = require('insulin');
  let UpdateValidator = insulin.get('UpdateValidator');
  let Database        = insulin.get('ndm').Database;
  let dbSchema        = {
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
  let db = new Database(dbSchema);

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

