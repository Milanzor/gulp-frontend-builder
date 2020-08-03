const gulp = require('gulp');
const config = require('../tools/config');
const plugins = require('../tools/plugins');
const uglify = require('gulp-uglify');
const util = require('../tools/util');
const saneWatch = require('gulp-sane-watch');
const chmod = require('gulp-chmod');
const babel = require('gulp-babel');

/**
 * app processing
 */
const app = (function() {
    const app = {};

    app.watch = function() {

        return saneWatch(config.get('js.app.source'), {
            verbose: config.get('debug', false),
            saneOptions: {
                poll: config.get('polling', false)
            }
        }, function() {
            plugins.debounce(function() {
                app.process();
            }, 1000);

        });
    };

    app.process = function() {
        return gulp.src(config.get('js.app.source'))
        .pipe(plugins.plumber())
        .pipe(plugins.newer({
            dest: config.get('js.app.target'),
            ext: '.min.js'
        }))
        .pipe(plugins.using())
        .pipe(plugins.size({showFiles: true}))
        .pipe(babel({
            presets: ['@babel/preset-env'].map(require.resolve)
        }))
        .pipe(uglify({
            output: {
                max_line_len: 500000
            }
        }))
        .pipe(plugins.rename(function(path) {
            path.extname = '.min.js';
        }))
        .pipe(chmod(config.get('js.app.chmod')))
        .pipe(gulp.dest(config.get('js.app.target'), {mode: config.get('js.app.directory-chmod')}));
    };

    // Gulp tasks
    gulp.task('js:app:watch', app.watch);
    gulp.task('js:app:process', app.process);

    return app;
})();

/**
 * lib processing
 */
const lib = (function() {
    const lib = {};

    lib.watch = function() {
        return saneWatch(config.get('js.lib.source'), {
            verbose: config.get('debug', false),
            saneOptions: {
                poll: config.get('polling', false)
            }
        }, function() {
            plugins.debounce(function() {
                lib.process();
            }, 1000);

        });
    };

    lib.process = function() {
        return gulp.src(config.get('js.lib.source'))
        .pipe(plugins.plumber())
        .pipe(plugins.order(config.get('js.lib.order')))
        .pipe(plugins.using())
        .pipe(plugins.size({showFiles: true}))
        .pipe(plugins.concat('lib.min.js'))
        .pipe(babel({
            presets: ['@babel/preset-env'].map(require.resolve)
        }))
        .pipe(uglify({
            output: {
                max_line_len: 500000
            }
        }))
        .pipe(chmod(config.get('js.lib.chmod')))
        .pipe(gulp.dest(config.get('js.lib.target'), {mode: config.get('js.lib.directory-chmod')}));
    };

    // Gulp tasks
    gulp.task('js:lib:watch', lib.watch);
    gulp.task('js:lib:process', lib.process);

    return app;
})();

/**
 * vendors components
 */
const vendors = (function() {
    const vendors = {};

    vendors.watch = function() {
        let watchPath = [];
        config.get('bower').forEach(function(bowerpath) {
            watchPath.push(bowerpath + 'bower.json');
        });

        watchPath = watchPath.concat(config.get('js.manual-vendor-installation-path', []));

        return saneWatch(watchPath, {
            verbose: config.get('debug', false),
            saneOptions: {
                poll: config.get('polling', false)
            }
        }, function() {
            plugins.debounce(function() {
                vendors.process();
            }, 1000);
        });
    };

    vendors.process = function() {
        const vendor_files = util.getVendorFiles(config.get('bower'), config.get('js.manual-vendor-installation-path'), '**/*.js');
        return gulp.src(vendor_files)
        .pipe(plugins.plumber())
        .pipe(plugins.order(config.get('js.vendors.order')))
        .pipe(plugins.using())
        .pipe(plugins.size({showFiles: true}))
        .pipe(plugins.gulpIgnore.include('**/*.js'))
        .pipe(uglify({
            output: {
                max_line_len: 500000
            }
        }))
        .pipe(plugins.concat('vendors.min.js'))
        .pipe(chmod(config.get('js.vendors.chmod')))
        .pipe(gulp.dest(config.get('js.vendors.target'), {mode: config.get('js.vendors.directory-chmod')}));
    };

    // Gulp tasks
    gulp.task('js:vendors:process', vendors.process);
    gulp.task('js:vendors:watch', vendors.watch);

    return vendors;

})();

module.exports = {app: app, vendors: vendors, lib: lib};


