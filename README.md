# overlord

## JavaScript method overloading.

Sorry about the acntient JavaScript. Origially written in around 2015.

## Usage

Simple function overload.

```
 function overloadable() {
    function overload1(one) { };
    function overload2(one, two) { //this will be called };
    function overload3(one, two, three) { };
    overlord(overload1, overload2, overload3)(arguments);
};
overloadable("Wyomning", "Juniper");
```

Accepts an array of overload functions.

```
function overloadable() {
    function overload1(one) { };
    function overload2(one, two) { //this will be called };
    function overload3(one, two, three) { };
    overlord([overload1, overload2, overload3])(arguments);
};

```

Constructor overloads (note 'this' works)

```
  function This() {
    this.name = "";
    this.game = "";
    this.same = "";
    var init = overlord(
        function (one) { this.name = one; },
        function (one, two) { this.name = one; this.game = two; },
        function (one, two, three) {
            this.name = one;
            this.game = two;
            this.same = three;
        }
    );
    init(arguments, this);
};

var thiis = new This("Abra", "ka", "dabra");
```

Overloads can be shared between functions/constructors.

```
 var init = overlord(
                [function (one) { done(false); },
                function (one, two) { done(false); },
                function (one, two, three) {
                    if (!--cnt) done(true);
                }]
            );

            function Cloud() {
                this.name = null;
                this.game = null;
                this.same = null;
                init(arguments, this);
            };

            function Rainbow() {
                this.name = null;
                this.game = null;
                this.same = null;
                init(arguments, this);
            };

            new Cloud("Calm", "a", "Sutra");
            new Rainbow("Plutonium", "and", "batteries");
```

## overlord.typed

Directs function call to correct overload based on argument TYPE (NB:" nothing to do with TypeScript - it was just a puppy when I wrote this.)

```
tasteTest.describe({
    vars: {
        Easy: function (schema) {
            var overlord = typedOverload(schema);
            return function Easy() {
                this.dataField = null;
                overlord(arguments, this);
            };
        },
        allRun: function (act, exp) {
            assert.equal(act, exp, "Function not called expected number of times.");
        },
        data: ["String", true, 88, new Date(), function () { }, {}]
    },
```

Works on functions and constructors.

```
    "Works on functions and constructors.":
        function () {
            var ok = 0;
            var fns = [function () { ok++; }];
            var ease = this.Easy(fns);
            var Pease = new this.Easy(fns);
            ease();
            new Pease();
            this.allRun(ok, 2);
            return true;
        },
```

Can run with/out context.

```
    "Can run with/out context.":
        function () {
            var ok = 0;
            var fns = [function (oneS, twoS) { this.dataField = oneS + twoS; }];
            var Ease = this.Easy(fns);
            var ease = new Ease("Large ", "volcano");
            assert.equal(ease.dataField, "Large volcano", "this.dataField not set.");
            return true;
        },
```

Can handle any data type.

```
    "Can handle any data type.":
        function () {
            var ok = 0;
            var fns = [
                function () { ok++; },
                function (oneS) { ok++; },
                function (oneB) { ok++; },
                function (oneN) { ok++; },
                function (oneD) { ok++; },
                function (oneF) { ok++; },
                function (oneO) { ok++; },
                function (oneR) { ok++; },
            ];
            var ease = this.Easy(fns);
            ease();
            ease("String");
            ease(true);
            ease(88);
            ease(new Date());
            ease(function () { });
            ease({});

            function handlesArgs() {
                ease(arguments);
            }
            handlesArgs("one", "Thgree0", "Five");

            this.allRun(ok, 8);
            return true;
        },
```

Yay!

```

    "":
        function () {
            return true;
        },
```

Calls correct function.

```
    "Calls correct function":
        function () {
            var fns = [
                function () { this.dataField = -1; },
                function (oneS) { this.dataField = 0; },
                function (oneS, oneB) { this.dataField = 1; },
                function (oneS, oneB, oneN) { this.dataField = 2; },
                function (oneS, oneB, oneN, oneD) { this.dataField = 3; },
                function (oneS, oneB, oneN, oneD, oneF) { this.dataField = 4; },
                function (oneS, oneB, oneN, oneD, oneF, oneO) { this.dataField = 5; },
            ];
            var ass = function (ease, val) { assert.equal(ease.dataField, val, "Incorrect function called."); };
            var Ease = this.Easy(fns);
            ass(new Ease(), -1);
            ass(new Ease("Rope"), 0);
            ass(new Ease("Rope", true), 1);
            ass(new Ease("Rope", true, 54), 2);
            ass(new Ease("Rope", true, 54, new Date()), 3);
            ass(new Ease("Rope", true, 54, new Date(), function () { }), 4);
            ass(new Ease("Rope", true, 54, new Date(), function () { }, {}), 5);
            return true;
        },
```

'this' passed correctly.

```
    "'this' passed correctly.":
        function () {
            var fns = [
                function () { throw new Error("Should not be called."); },
                function (testS, birthD) { this.dataField = birthD; }
            ];
            var Ease = this.Easy(fns);
            var date = new Date('1777/01/18');
            var ease = new Ease("Unimportant", date);
            assert(ease.dataField === date, "'this' not written to.");
            return true;
        },

```

Overloads can be shared between functions/constructors.

```

    "Overloads can be shared between functions/constructors.":
        function () {
            var ok = 0;
            var fns = [
                function () { },
                function (oneS) { ok++; },
            ];
            var overlord = typedOverload(fns);

            function error() {
                this.dataField = null;
                overlord(arguments);
            };

            function Hill() {
                this.dataField = null;
                overlord(arguments, this);
            };

            error("First");
            new Hill("Second");
            assert.equal(ok, 2, "Not ok.");
            return true;
        },

});


```

Thank you, younger Richard.
