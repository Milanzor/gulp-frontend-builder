var gulp = require('gulp');
var config = require('../tools/config');
var plugins = require('../tools/plugins');
var sourcemaps = require('gulp-sourcemaps');
var util = require('../tools/util');

module.exports = (function () {

    // Initialize self
    var fonts = {};

    fonts.process = function () {
        var vendor_files = util.getVendorFiles(config.get('bower', []), config.get('manual-vendor-installation-path'), ['**/*.svg', '**/*.eot', '**/*.ttf', '**/*.woff', '**/*.woff2']);
        return gulp.src(vendor_files)
            .pipe(plugins.plumber())
            .pipe(plugins.using())
            .pipe(gulp.dest(config.get('fonts.target')));
    };

    // Gulp tasks
    gulp.task('fonts:process', fonts.process);
})();
