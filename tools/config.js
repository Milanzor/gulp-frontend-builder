try {
    var config = require('../config.json');
} catch (e) {
    try {
        var config = require('../../build.config.json');
    } catch (e) {

        try{
            var argv = require('minimist')(process.argv.slice(2));
            var config = require(argv.config);
            var wd = require('path').dirname(argv.config);
            process.chdir(wd);
            console.log('Using config file ' + argv.config);
            console.log('Changes working directory to ' + wd);
        }catch(e){
            console.log('No valid config.json (or ../build.config.json) found, you can also pass the location of the config file through --config /path/to/yourconfig.json');
            process.exit();
        }

    }
}

var util = require('./util');

module.exports = (function () {
    var self = {};

    self.get = function (path, def) {
        if (typeof path === 'undefined') {
            return config;
        }
        return util.hashGet(config, path, def);
    };

    self.set = function (path, val) {
        util.hashSet(config, path, val);
        return config;
    };

    return self;
})();