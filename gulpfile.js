/**
 * Appo Gulp file
 * Does everything you need for Appo assets
 */
var gulp = require('gulp');
var app = require('require-dir')('./app');

var tasks = [
    'scss:watch',
    'js:app:watch',
    'js:vendors:watch',
    'js:lib:watch'
];

gulp.task('default', tasks);
