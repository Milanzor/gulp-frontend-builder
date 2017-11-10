var path = require('path');

try {
    var configLocation = '../config.json';
    var config = require(configLocation);
} catch (e) {
    try {
        var configLocation = '../../build.config.json';
        var config = require(configLocation);
    } catch (e) {

        try {

            // Get arguments
            var argv = require('minimist')(process.argv.slice(2));

            // Config argument
            var configLocation = path.resolve(argv.config);
            // Make workingdirectory
            var workingDirectory = path.dirname(configLocation);

            // Load the config
            var config = require(path.resolve(configLocation));

            process.chdir(workingDirectory);

            console.log('Using config file ' + argv.config);
            console.log('Changes working directory to ' + workingDirectory  );

        } catch (e) {
            console.log('No valid config.json (or ../build.config.json) found, you can also pass the location of the config file through --config path/to/yourconfig.json');
            process.exit();
        }

    }
}

var util = require('./util');
var gulp = require('gulp');
var saneWatch = require('gulp-sane-watch');
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
