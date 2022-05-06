var assert = require('assert');
var taste = require('taste-test');
var typedOverload = require('../typed.js');

var tasteTest = new taste.Test();
var equal = assert.equal;



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

    "Can run with/out context.":
        function () {
            var ok = 0;
            var fns = [function (oneS, twoS) { this.dataField = oneS + twoS; }];
            var Ease = this.Easy(fns);
            var ease = new Ease("Large ", "volcano");
            assert.equal(ease.dataField, "Large volcano", "this.dataField not set.");
            return true;
        },

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


    "Yay!":
        function () {
            return true;
        },

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
