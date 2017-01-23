/**
 * Appo Gulp file
 * Does everything you need for Appo assets
 */
var gulp = require('gulp');
var app = require('require-dir')('./app');

gulp.task('default', ['scss:watch']);