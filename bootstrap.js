'use strict';

/**
 * This script sets up the dependency injection container, insulin.
 */
const insulin = require('insulin');

// Static dependencies.
insulin
  .factory('moment',   () => require('moment'))
  .factory('deferred', () => require('deferred'))
  .factory('ndm',      () => require('node-data-mapper'));

// Error classes.
require('bsy-error');

// Application (dynamic) dependencies.
let glob = require('glob');
let opts = {
  cwd: __dirname,
  ignore: [
    './node_modules/**',
    './grunt/**',
    './Gruntfile.js',
    './**/*Spec.js',
    './bootstrap.js',
    './index.js'
  ]
};

let files = glob.sync('./**/*.js', opts);

// Let each file register itself with the DiC.
files.forEach(require);

// Export the list of files.
module.exports = files;

