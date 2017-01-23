module.exports = (function () {
    var self = {};

    self.hashGet = function (obj, path, def) {
        for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {
            if (i in path && path[i] in obj) {
                obj = obj[path[i]];
            } else {
                return def;
            }
        }
        return (typeof obj !== 'undefined') ? obj : def;
    };

    self.hashSet = function (obj, path, val) {
        for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {
            obj = obj[path[i]];
        }
        if (typeof obj !== 'undefined') {
            obj = val;
            return obj;
        }
        return false;
    };

    return self;
})();