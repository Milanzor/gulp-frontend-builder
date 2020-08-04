const gulp = require('gulp');
const config = require('../tools/config');
const plugins = require('../tools/plugins');
const util = require('../tools/util');

module.exports = (function() {

    // Initialize self
    const fonts = {};

    fonts.process = function() {
        const vendor_files = util.getVendorFiles(config.get('bower', []), config.get('fonts.manual-vendor-installation-path'), ['**/*.svg', '**/*.eot', '**/*.ttf', '**/*.woff', '**/*.woff2']);
        return gulp.src(vendor_files)
        .pipe(plugins.plumber())
        .pipe(plugins.using())
        .pipe(plugins.chmod(config.get('directory-chmod'), true))
        .pipe(plugins.chmod(config.get('chmod')))
        .pipe(gulp.dest(config.get('fonts.target')));
    };

    // Gulp tasks
    gulp.task('fonts:process', fonts.process);
})();

