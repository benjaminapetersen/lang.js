'use strict';
(function () {

    var // helpers
        notImpl = function() {
            console.warn('Function is not implemented');
        },
        wontImpl = function() {
            console.error('Function will not be implemented');
        },
        log = function(msg) {
            if(console && console.log) {
                console.log(msg);
            }
        },
        // may change demethodize to 'unbind'?
        // or demethodize = function(fn) { return Function.prototype.call.bind(fn) }
        demethodize = Function.prototype.bind.bind(Function.prototype.call),
        // core
        noop = function() {},
        // fn
        identity = function(value) { return value; },
        constant = function(value) { return function() { return value; }},
        funApply = demethodize(Function.prototype.apply),
        funCall = demethodize(Function.prototype.call),
        // string
        strSplit = demethodize(String.prototype.split),
        strSlice = demethodize(String.prototype.slice),
        strIndexOf = demethodize(String.prototype.indexOf),
        strToLowerCase = demethodize(String.prototype.toLowerCase),
        strToUpperCase = demethodize(String.prototype.toUpperCase),
        // array
        arrJoin = demethodize(Array.prototype.join),
        arrForEach = demethodize(Array.prototype.forEach),
        arrMap = demethodize(Array.prototype.map),
        arrSlice = demethodize(Array.prototype.slice),
        // object
        hasProp = Function.prototype.call.bind(Object.prototype.hasOwnProperty),
        objKeys = function(obj) {
            return Object.keys(obj);
        },
        objToArray = function(obj) {
            var arr = [];
            for( var i in obj ) {
                if (obj.hasOwnProperty(i)){
                    arr.push(obj[i]);
                }
            }
            return arr;
        },
        // todo: function(obj, fn, context)?
        // context for unction binding... if provided
        objMap = function(obj, fn) {
            return arrMap(objToArray(obj), fn);
        },
        objEach = function(obj, fn) {
            arrForEach(objKeys(obj), function(key) {
                fn(obj[key], key, obj);
            });
        },
        //
        // exports... eventually
        //
        // in order to wrap everything in a namespace.
        // at the moment, there is no closure around all of this,
        // so everything is also global.
        lang = {
            // namespace?
            //core: {},
            // core utility methods
            //  constant: notImpl,
            //  identity: notImpl,
            //  noop: notImpl,
            // core functional iterators
            // core composition methods
            //  bind: notImpl,
            //  partial: notImpl,
            //  compose: notImpl,
            //  curry: wontImpl -> too weird in js
            // array methods
            string: {
                lower: strToLowerCase,
                upper: strToUpperCase,
                split: strSplit,
                slice: strSlice,
                indexOf: strIndexOf
            },
            array: {
                // find
                // reduce
                // any / every
                // all / some
                // filter
                slice: arrSlice,
                join: arrJoin,
                each: arrForEach,
                map: arrMap
            },
            object: {
                // find
                // reduce
                // any / every
                // all / some
                // filter
                keys: objKeys,
                map: objMap,
                each: objEach
            },
            fn: {
                call: funCall,
                apply: funApply,
                // bind
                identity: identity,
                constant: constant
            },
            to: {
                array: objToArray
            }
        }

    log('lang.js');

    // exports
    this.lang = lang;
    if (typeof module !== 'undefined' && module.exports) {
            module.exports = lang;
    }
}).call(this);


