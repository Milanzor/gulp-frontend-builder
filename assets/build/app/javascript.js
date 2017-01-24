var gulp = require('gulp');
var config = require('../tools/config');
var plugins = require('../tools/plugins');
var uglify = require('gulp-uglify');
var util = require('../tools/util');

/**
 * app processing
 */
var app = (function () {
    var app = {};

    app.watch = function () {
        return gulp.watch(config.get('js.app.source'), {}, function (e) {

            if (config.get('debug', false)) {
                plugins.gutil.log('Js app watcher triggered by event \'' + plugins.gutil.colors.magenta(e.type) + '\' on \'' + plugins.gutil.colors.magenta(e.path) + '\'');
            }

            app.process();
        });
    };

    app.process = function () {
        return gulp.src(config.get('js.app.source'))
            .pipe(plugins.plumber())
            .pipe(plugins.using())
            .pipe(uglify())
            .pipe(plugins.rename(function (path) {
                path.extname = ".min.js"
            }))
            .pipe(gulp.dest(config.get('js.app.target')));
    };

    // Gulp tasks
    gulp.task('js:app:watch', app.watch);
    gulp.task('js:app:process', app.process);

    return app;
})();


/**
 * lib processing
 */
var lib = (function () {
    var lib = {};

    lib.watch = function () {
        gulp.watch(config.get('js.lib.source'), {}, function (e) {
            if (config.get('debug', false)) {
                plugins.gutil.log('Js lib watcher triggered by event \'' + plugins.gutil.colors.magenta(e.type) + '\' on \'' + plugins.gutil.colors.magenta(e.path) + '\'');
            }
            lib.process();
        });
    };

    lib.process = function () {
        return gulp.src(config.get('js.lib.source'))
            .pipe(plugins.plumber())
            .pipe(plugins.order(config.get('js.lib.order')))
            .pipe(plugins.using())
            .pipe(uglify())
            .pipe(plugins.concat('lib.min.js'))
            .pipe(gulp.dest(config.get('js.lib.target')));
    };

    // Gulp tasks
    gulp.task('js:lib:watch', lib.watch);
    gulp.task('js:lib:process', lib.process);

    return app;
})();


/**
 * vendors components
 */
var vendors = (function () {
    var vendors = {};

    vendors.watch = function () {
        var watchPath = config.get('bower').concat(config.get('manual-vendor-installation-path'));
        return gulp.watch(watchPath, {}, function (e) {
            if (config.get('debug', false)) {
                plugins.gutil.log('Js lib watcher triggered by event \'' + plugins.gutil.colors.magenta(e.type) + '\' on \'' + plugins.gutil.colors.magenta(e.path) + '\'');
            }
            vendors.process();
        });
    };

    vendors.process = function () {
        var vendor_files = util.getVendorFiles(config.get('bower'), config.get('manual-vendor-installation-path'), '**/*.js');
        return gulp.src(vendor_files)
            .pipe(plugins.plumber())
            .pipe(plugins.using())
            .pipe(plugins.order(config.get('js.vendors.order')))
            .pipe(uglify())
            .pipe(plugins.concat('vendors.min.js'))
            .pipe(gulp.dest(config.get('js.vendors.target')));
    };

    // Gulp tasks
    gulp.task('js:vendors:process', vendors.process);
    gulp.task('js:vendors:watch', vendors.watch);

    return vendors;

})();

module.exports = {app: app, vendors: vendors, lib: lib};
