var gulp = require('gulp');
var config = require('../tools/config');
var plugins = require('../tools/plugins');
var sass = require('gulp-sass');
var saneWatch = require('gulp-sane-watch');

module.exports = (function() {

    // Initialize scss
    var scss = {};

    // Watch task
    scss.watch = function() {

        return saneWatch(config.get('scss.source'), {
            verbose: config.get('debug', false),
            saneOptions: {
                poll: true
            }
        }, function() {

            plugins.debounce(function() {
                scss.process();
            }, 1000);
        });

    };

    scss.process = function() {
        var autoprefixer = require('gulp-autoprefixer');
        return gulp.src(config.get('scss.source'))
            .pipe(plugins.plumber())
            .pipe(plugins.using())
            .pipe(plugins.size({showFiles: true}))
            .pipe(sass({outputStyle: config.get('scss.style', 'compressed')}))
            .pipe(plugins.rename(function(path) {
                path.extname = config.get('scss.file_ext', '.min.css');
            }))
            .pipe(gulp.dest(config.get('scss.target')));
    };

    var blessTargets = [config.get('scss.target') + '**/*.css', '!' + config.get('scss.target') + 'ie9/**/*.css'];

    scss.processbless = function() {
        var bless = require('gulp-bless');
        return gulp.src(blessTargets)
            .pipe(plugins.plumber())
            .pipe(plugins.using())
            .pipe(bless())
            .pipe(sass({outputStyle: config.get('scss.style', 'compressed')}))
            .pipe(gulp.dest(config.get('scss.target') + 'ie9/'));
    };

    scss.clean = function() {
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

    gulp.task('scss:bless', scss.processbless);

    gulp.task('scss:clean', scss.clean);
})();
