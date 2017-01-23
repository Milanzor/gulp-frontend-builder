module.exports = (function () {
    var self = {};

    self.hashGet = function (obj, path) {
        for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {
            obj = obj[path[i]];
        }
        return obj;
    };

    self.hashSet = function (obj, path, val) {
        for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {
            obj[path[i]] = val;
        }
        return obj;
    };
    return self;
})();