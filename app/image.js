var gulp = require('gulp');
var config = require('../tools/config');
var plugins = require('../tools/plugins');
var image = require('gulp-image');


module.exports = (function () {

    // Initialize scss
    var images = {};

    images.optimize = function () {

        return gulp.src(config.get('images.source'), {base: './'})
            .pipe(plugins.plumber())
            .pipe(plugins.using())
            .pipe(image())
            .pipe(gulp.dest('./'));
    };

    gulp.task('image:optimize', images.optimize);
    
})();
