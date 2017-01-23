var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var using = gutil.noop;
var config = require('./config');
var rename = require('gulp-rename');

if (config.get('debug') === true) {
    using = require('gulp-using');
}

module.exports = {
    plumber: plumber,
    using: using,
    gutil: gutil,
    rename: rename
};