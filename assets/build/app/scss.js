var gulp = require('gulp');
var config = require('../tools/config');
var plumber = require('gulp-plumber');
module.exports = (function () {

    // Initialize self
    var self = {};

    // Watch task
    self.watch = function () {
        return gulp.watch(config.get('scss.path'), {}, self.process);
    };
    
    
    self.process = function(e){
        console.log('watch triggered process');
    };


    // Gulp tasks
    gulp.task('scss:watch', self.watch);
})();
