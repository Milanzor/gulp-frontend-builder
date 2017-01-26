var gulp = require('gulp');
var config = require('../tools/config');
var plugins = require('../tools/plugins');
var sass = require('gulp-sass');
var bless = require('gulp-bless');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');

module.exports = (function () {

    // Initialize scss
    var scss = {};

    // Watch task
    scss.watch = function () {
        return gulp.watch(config.get('scss.source'), {}, function (e) {
            if (config.get('debug', false)) {
                plugins.gutil.log('Scss watcher triggered by event \'' + plugins.gutil.colors.magenta(e.type) + '\' on \'' + plugins.gutil.colors.magenta(e.path) + '\'');
            }
            plugins.debounce(function () {
                scss.process();
            }, 1000);
        });
    };

    scss.process = function () {
        return gulp.src(config.get('scss.source'))
            .pipe(plugins.plumber())
            .pipe(plugins.using())
            .pipe(sourcemaps.init({largeFile: true}))
            .pipe(sass({outputStyle: config.get('scss.style', 'compressed')}))
            .pipe(plugins.rename(function (path) {
                path.extname = ".min.css";
            }))
            .pipe(sourcemaps.write('maps/', {
                sourceMappingURL: function (file) {
                    return 'maps/' + file.relative + '.map';
                }
            }))
            .pipe(gulp.dest(config.get('scss.target')));
    };

    var compiledTargets = [config.get('scss.target') + '**/*.css', '!' + config.get('scss.target') + 'ie9/**/*.css', '!' + config.get('scss.target') + 'clean/**/*.css'];

    scss.watchbless = function () {
        return gulp.watch(compiledTargets, {}, function (e) {
            if (config.get('debug', false)) {
                plugins.gutil.log('Scss bless watcher triggered by event \'' + plugins.gutil.colors.magenta(e.type) + '\' on \'' + plugins.gutil.colors.magenta(e.path) + '\'');
            }
            scss.processbless();
        });
    };

    scss.processbless = function () {
        return gulp.src(compiledTargets)
            .pipe(plugins.plumber())
            .pipe(plugins.using())
            .pipe(bless())
            .pipe(sass({outputStyle: config.get('scss.style', 'compressed')}))
            .pipe(gulp.dest(config.get('scss.target') + 'ie9/'));
    };

    scss.clean = function(){
        return gulp.src(compiledTargets)
            .pipe(plugins.plumber())
            .pipe(plugins.using())
            .pipe(cleanCSS({inline: ['remote']}))
            .pipe(gulp.dest(config.get('scss.target') + 'clean/'));
    };

    // Gulp tasks
    gulp.task('scss:watch', scss.watch);
    gulp.task('scss:process', scss.process);

    gulp.task('scss:bless:watch', scss.watchbless);
    gulp.task('scss:bless:process', scss.processbless);

    gulp.task('scss:clean', scss.clean);
})();
