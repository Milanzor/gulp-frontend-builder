try {
    var configLocation = '../config.json';
    var config = require(configLocation);
} catch (e) {
    try {
        var configLocation = '../../build.config.json';
        var config = require(configLocation);
    } catch (e) {

        try {
            var argv = require('minimist')(process.argv.slice(2));
            var configLocation = argv.config;
            var config = require(configLocation);
            var wd = require('path').dirname(argv.config);
            process.chdir(wd);
            console.log('Using config file ' + argv.config);
            console.log('Changes working directory to ' + wd);
        } catch (e) {
            console.log('No valid config.json (or ../build.config.json) found, you can also pass the location of the config file through --config /path/to/yourconfig.json');
            process.exit();
        }

    }
}

var util = require('./util');
var gulp = require('gulp');
var saneWatch = require('gulp-sane-watch');
var path = require('path');
module.exports = (function() {
    var self = {};

    self.get = function(path, def) {
        if (typeof path === 'undefined') {
            return config;
        }
        return util.hashGet(config, path, def);
    };

    self.set = function(path, val) {
        util.hashSet(config, path, val);
        return config;
    };

    self.refresh = function() {
        if (typeof configLocation !== 'undefined') {
            delete require.cache[require.resolve(configLocation)];
            config = require(configLocation);
            console.log('Reloaded config');
        }
    };

    gulp.task('config:watch', self.watch);

    return self;
})();