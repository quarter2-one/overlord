function overlord_Typed(defA) {
    var index = {}; /* made changes here 22/12 - was: var index = [] */
    if (!Array.isArray(defA)) throw new Error("'overroad' requires Array.");
    for (var prop in defA) {
        var key = arrayKey(defA[prop]);
        index[key] = defA[prop];
    }
    return function init (args, context) {
        var key = callKey(args);
        var fn = index[key];
        if (!fn) throw new Error("No overload matches the argument/s passed.");
        return fn.apply(context || fn, args);
    };

    function callKey(args){
        var key = "";
        [].slice.call(args, 0).forEach(function (arg) { key += ({}).toString.call(arg); });
        return key;
    };
    function arrayKey(fn){
        var out = "";
        arrayKey.item = arrayKey.item || { 'S' : '[object String]', 'N' : '[object Number]', 'B' : '[object Boolean]', 'D' : '[object Date]', 'F' : '[object Function]', 'O' : '[object Object]', 'A' : '[object Array]', 'R' : '[object Arguments]' };
        var params = (function () {
            var rtn = fn.toString(); /* get function string */
            rtn = rtn.match(/function[^(]*\(([^)]*)\)/)[1]; /* Get params */
            rtn = rtn.match(/(\w)\b/g); /* Get last character of each param  */
            return rtn;
        })();
        if (params === null) return '';
        params.forEach(function (key) { out+= arrayKey.item[key]; });
        return out;
    };
};

module.exports = overlord_Typed;
