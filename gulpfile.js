/**
 * Gulp file
 * Does everything you need for Frontend assets
 */

const gulp = require('gulp');
require('./app/javascript');
require('./app/scss');
require('./app/fonts');

gulp.task('default', gulp.parallel(['scss:watch', 'js:app:watch', 'js:vendors:watch', 'js:lib:watch']));
