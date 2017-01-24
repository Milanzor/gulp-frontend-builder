var gulp = require('gulp');
var config = require('../tools/config');
var plugins = require('../tools/plugins');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

module.exports = (function () {

    // Initialize scss
    var scss = {};

    // Watch task
    scss.watch = function () {
        return gulp.watch(config.get('scss.source'), {}, function (e) {
            if (config.get('debug', false)) {
                plugins.gutil.log('Scss watcher triggered by event \'' + plugins.gutil.colors.magenta(e.type) + '\' on \'' + plugins.gutil.colors.magenta(e.path) + '\'');
            }
            scss.process();
        });
    };

    scss.process = function () {

        return gulp.src(config.get('scss.source'))
            .pipe(plugins.plumber())
            .pipe(plugins.using())
            .pipe(sourcemaps.init({largeFile: true}))
            .pipe(sass({outputStyle: config.get('scss.style', 'compressed')}))
            .pipe(plugins.rename(function (path) {
                path.extname = ".min.css"
            }))
            .pipe(sourcemaps.write(config.get('scss.target') + 'maps/', {
                sourceMappingURL: function (file) {
                    return 'maps/' + file.relative + '.map';
                }
            }))
            .pipe(gulp.dest(config.get('scss.target')));
    };

    // Gulp tasks
    gulp.task('scss:watch', scss.watch);
    gulp.task('scss:process', scss.process);
})();
