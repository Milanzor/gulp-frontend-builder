const path = require('path');
let configLocation, config;

try {
    configLocation = '../config.json';
    config = require(configLocation);
} catch (e) {

    try {
        configLocation = '../../build.config.json';
        config = require(configLocation);
    } catch (e) {

        try {

            // Get arguments
            let argv = require('minimist')(process.argv.slice(2));

            // Config argument
            configLocation = path.resolve(argv.config);

            // Make workingDirectory
            let workingDirectory = path.dirname(configLocation);

            // Load the config
            config = require(path.resolve(configLocation));

            process.chdir(workingDirectory);

            console.log('Using config file ' + argv.config);
            console.log('Changed working directory to ' + workingDirectory);

        } catch (e) {
            console.log('No valid config.json (or ../build.config.json) found, you can also pass the location of the config file through --config path/to/yourconfig.json');
            process.exit();
        }

    }
}

const util = require('./util');
const gulp = require('gulp');

module.exports = (function() {
    const self = {};

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
