const gulp = require('gulp');
const config = require('../tools/config');
const plugins = require('../tools/plugins');
const image = require('gulp-image');

module.exports = (function() {

    // Initialize scss
    const images = {};

    images.optimize = function() {

        return gulp.src(config.get('images.source'), {base: './'})
        .pipe(plugins.plumber())
        .pipe(plugins.using())
        .pipe(image())
        .pipe(gulp.dest('./'));
    };

    gulp.task('image:optimize', images.optimize);

})();

