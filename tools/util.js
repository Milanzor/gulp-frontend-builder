module.exports = (function() {
    let self = {};

    self.unixFilepermission = function(stat_mode) {
        return '0' + (stat_mode & parseInt('777', 8)).toString(8);
    };

    self.hashGet = function(obj, path, def) {
        for (let i = 0, hashPath = path.split('.'), len = hashPath.length; i < len; i++) {
            if (i in hashPath && hashPath[i] in obj) {
                obj = obj[hashPath[i]];
            } else {
                return def;
            }
        }
        return (typeof obj !== 'undefined') ? obj : def;
    };

    self.hashSet = function(obj, path, val) {
        for (let i = 0, hashPath = path.split('.'), len = hashPath.length; i < len; i++) {
            obj = obj[hashPath[i]];
        }
        if (typeof obj !== 'undefined') {
            obj = val;
            return obj;
        }
        return false;
    };

    self.getVendorFiles = function(bowerPaths, manual_path, filter) {
        filter = filter || '**/**';
        let mainBowerFiles = require('main-bower-files');
        let files = [];
        if (bowerPaths.length) {
            bowerPaths.forEach(function(bower) {
                files = files.concat(mainBowerFiles(filter, {
                    paths: bower
                }));
            });
        }
        files = files.concat(manual_path || []);
        return files;
    };

    return self;
})();
