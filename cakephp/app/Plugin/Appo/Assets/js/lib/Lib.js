var Lib = (function () {

    var self = {};

    $(document).ready(function () {
        console.log('Lib docready');
        $(Lib).trigger('document.ready');
    });

    return self;
})();