/**
 * Appo Gulp file
 * Does everything you need for Appo assets
 *
 *
 * Todo:
 * Fix the watch tasks, make them watch the right files, currently they only watch the bower.jsons
 *
 *
 */
var gulp = require('gulp');
var app = require('require-dir')('./app');

var tasks = [
    'scss:watch',
    'scss:process',
    'scss:bless:watch',
    'scss:bless:process',
    'js:app:process',
    'js:app:watch',
    'js:vendors:process',
    'js:vendors:watch',
    'js:lib:process',
    'js:lib:watch'
];

gulp.task('default', tasks);