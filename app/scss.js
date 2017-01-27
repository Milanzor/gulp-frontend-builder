var gulp = require('gulp');
var config = require('../tools/config');
var plugins = require('../tools/plugins');
var sass = require('gulp-sass');

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
        var sourcemaps = require('gulp-sourcemaps');
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

    var blessTargets = [config.get('scss.target') + '**/*.css', '!' + config.get('scss.target') + 'ie9/**/*.css'];

    scss.watchbless = function () {
        return gulp.watch(blessTargets, {}, function (e) {
            if (config.get('debug', false)) {
                plugins.gutil.log('Scss bless watcher triggered by event \'' + plugins.gutil.colors.magenta(e.type) + '\' on \'' + plugins.gutil.colors.magenta(e.path) + '\'');
            }
            scss.processbless();
        });
    };

    scss.processbless = function () {
        var bless = require('gulp-bless');
        return gulp.src(blessTargets)
            .pipe(plugins.plumber())
            .pipe(plugins.using())
            .pipe(bless())
            .pipe(sass({outputStyle: config.get('scss.style', 'compressed')}))
            .pipe(gulp.dest(config.get('scss.target') + 'ie9/'));
    };

    scss.clean = function(){
        var insert = require('gulp-insert');
        var cleanCSS = require('gulp-clean-css');
        return gulp.src([config.get('scss.target') + '**/*.css', '!' + config.get('scss.target') + 'ie9/**/*.css'])
            .pipe(plugins.plumber())
            .pipe(plugins.using())
            .pipe(cleanCSS({inline: ['remote']}))
            .pipe(insert.append('/* cleaned */'))
            .pipe(gulp.dest(config.get('scss.target')));
    };

    // Gulp tasks
    gulp.task('scss:watch', scss.watch);
    gulp.task('scss:process', scss.process);

    gulp.task('scss:bless:watch', scss.watchbless);
    gulp.task('scss:bless:process', scss.processbless);

    gulp.task('scss:clean', scss.clean);
})();
