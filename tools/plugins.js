var config = require('./config');

module.exports = {
    plumber: require('gulp-plumber'),
    using: (config.get('debug') === true) ? require('gulp-using') : require('gulp-util').noop,
    gutil: require('gulp-util'),
    rename: require('gulp-rename'),
    concat: require('gulp-concat'),
    order: require('gulp-order'),
    gulpIgnore: require('gulp-ignore'),
    newer: require('gulp-newer'),
    debounce: (function () {
        var timer = 0;
        return function (callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })()
};