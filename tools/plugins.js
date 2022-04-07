const config = require('./config');

module.exports = {
    plumber: require('gulp-plumber'),
    using: (config.get('debug') === true) ? require('gulp-using') : require('gulp-util').noop,
    size: (config.get('debug') === true) ? require('gulp-size') : require('gulp-util').noop,
    gutil: require('gulp-util'),
    rename: require('gulp-rename'),
    concat: require('gulp-concat'),
    order: require('gulp-order'),
    gulpIgnore: require('gulp-ignore'),
    newer: require('gulp-newer'),
    clean: require('gulp-clean'),
    chmod: require('gulp-chmod'),
    uglify: require('gulp-uglify'),
    babel: require('gulp-babel'),
    autoprefixer: require('gulp-autoprefixer'),
    sass: require('gulp-sass')(require('sass')),
    debounce: (function() {
        let timer = 0;
        return function(callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })()
};
