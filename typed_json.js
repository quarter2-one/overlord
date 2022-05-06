function overroad_json(defO) {
    var index = [];
    if (typeof defO !== 'object') throw new Error("'overroad' requires Array.");
    for (var prop in defO) {
        var key = jsonKey(prop);
        index[key] = defO[prop];
    }
    return function init (args, context) {
        var key = callKey(args);
        var fn = index[key];
        if (!fn) throw new Error("No overload matches " + args.length + " arguments.");
        fn.apply(context || fn, args);
    };
    function jsonKey(key) {
        if (key == '') return '';
        key = (","+key).replace(/\s/g, '');
        return key.replace(/,([a-zA-Z0-9\-\_]+)/g,"[object $1]");
    };
    function callKey(args){
        var key = "";
        [].slice.call(args, 0).forEach(function (arg) { key += ({}).toString.call(arg); });
        return key;
    };
};

module.exports = overroad_json;
