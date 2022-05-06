

function overlord () {
    var index = {};
    var fnA = (Array.isArray(arguments[0])) ? arguments[0] : [].slice.call(arguments, 0); /* Accepts ([fn1, fn2, ..]) OR (fn1, fn2,...)  */
    fnA.forEach(function(fn){ index[fn.length] = fn });

    return function init (args, context) {
        args = [].slice.call(args || [], 0);
        var fn = index[args.length];
        if (!fn) throw new Error("No overload matches " + args.length + " arguments.");
        fn.apply(context || fn, args);
    };
};

module.exports = overlord;
