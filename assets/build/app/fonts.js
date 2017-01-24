var gulp = require('gulp');
var config = require('../tools/config');
var plugins = require('../tools/plugins');
var sourcemaps = require('gulp-sourcemaps');
var util = require('../tools/util');

module.exports = (function () {

    // Initialize self
    var fonts = {};

    // Watch task
    fonts.watch = function () {
        return gulp.watch(config.get('fonts.source'), {}, function (e) {
            if (config.get('debug', false)) {
                plugins.gutil.log('Scss watcher triggered by event \'' + plugins.gutil.colors.magenta(e.type) + '\' on \'' + plugins.gutil.colors.magenta(e.path) + '\'');
            }
            fonts.process();
        });
    };

    fonts.process = function () {
        var vendor_files = util.getVendorFiles(config.get('bower', []), config.get('manual-vendor-installation-path'), ['**/*.svg', '**/*.eot', '**/*.ttf', '**/*.woff', '**/*.woff2']);
        return gulp.src(vendor_files)
            .pipe(plugins.plumber())
            .pipe(plugins.using())
            .pipe(gulp.dest(config.get('fonts.target')));
    };

    // Gulp tasks
    gulp.task('fonts:watch', fonts.watch);
    gulp.task('fonts:process', fonts.process);
})();
