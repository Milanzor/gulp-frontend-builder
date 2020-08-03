const gulp = require('gulp');
const config = require('../tools/config');
const plugins = require('../tools/plugins');
const sass = require('gulp-sass');
const saneWatch = require('gulp-sane-watch');
const chmod = require('gulp-chmod');

module.exports = (function() {

    // Initialize scss
    const scss = {};

    // Watch task
    scss.watch = function() {
        return saneWatch(config.get('scss.source'), {
            verbose: config.get('debug', false),
            saneOptions: {
                poll: config.get('polling', false)
            }
        }, function() {
            plugins.debounce(function() {
                scss.process();
            }, 1000);
        });

    };

    scss.process = function() {
        const autoprefixer = require('gulp-autoprefixer');
        return gulp.src(config.get('scss.source'))
        .pipe(plugins.plumber())
        .pipe(plugins.using())
        .pipe(plugins.size({showFiles: true}))
        .pipe(sass({outputStyle: config.get('scss.style', 'compressed')}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(plugins.rename(function(path) {
            path.extname = config.get('scss.file_ext', '.min.css');
        }))
        .pipe(chmod(config.get('scss.chmod')))
        .pipe(gulp.dest(config.get('scss.target')));
    };

    // Gulp tasks
    gulp.task('scss:watch', scss.watch);
    gulp.task('scss:process', scss.process);
})();

