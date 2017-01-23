try {
    var config = require('../config.json');
} catch (e) {
    try {
        var config = require('../../build.config.json');
    } catch (e) {
        console.log('No valid config.json (or ../build.config.json) found')
    }
}
var util = require('./util');


module.exports = (function () {
    var self = {};

    self.get = function (path) {
        if (typeof path === 'undefined') {
            return config;
        }
        return util.hashGet(config, path);
    };

    self.set = function (path, val) {
        util.hashSet(config, path, val);
        return config;
    };

    return self;
})();