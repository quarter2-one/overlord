var assert = require('assert');
var taste = require('taste-test');
var overlord = require('../overlord.js');

var tasteTest = new taste.Test();
var equal = assert.equal;


var testDefinition = {
    "Calls correct function & Can run without context.":
        function (done) {
            function splash() {
                function alg1(one) { done(false); };
                function alg2(one, two) { done(); };
                function alg3(one, two, three) { done(false); };
                overlord(alg1, alg2, alg3)(arguments);
            };
            splash("Wyomning", "Juniper");
        },

    "'this' passed correctly.":
        function () {
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

            var vvis = new This("Abra", "ka", "dabra");
            assert.equal(vvis.name, "Abra", "Nope.");
            assert.equal(vvis.game, "ka", "Nope.");
            assert.equal(vvis.same, "dabra", "Nope.");
            return true;
        },


    "Overloads can be shared between functions/constructors.":
        function (done) {
            var cnt = 2;
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
        },

    "Accepts an array of functions.":
        function (done) {
            function splash() {
                function alg1(one) { done(false); };
                function alg2(one, two) { done(); };
                function alg3(one, two, three) { done(false); };
                overlord([alg1, alg2, alg3])(arguments);
            };
            splash("Wyomning", "Juniper");
        },

    "Yay!":
        function () {
            return true;
        }

};

tasteTest.describe(testDefinition);
