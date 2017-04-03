/**
 * Appo Gulp file
 * Does everything you need for Appo assets
 */
var gulp = require('gulp');
var app = require('require-dir')('./app');

var tasks = [
    'scss:watch',
    'scss:process',
    'js:app:process',
    'js:app:watch',
    'js:vendors:process',
    'js:vendors:watch',
    'js:lib:process',
    'js:lib:watch'
];

gulp.task('default', tasks);
