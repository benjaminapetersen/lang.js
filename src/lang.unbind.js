//
// the lang.unbind.js version is simply aiming to detach methods from
// built in prototype objects and return them as a collection of
// standalone* functions.
//
'use strict';
(function (root, undef) {

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
        // may change unbind to 'unbind'?
        // or unbind = function(fn) { return Function.prototype.call.bind(fn) }
        unbind = Function.prototype.bind.bind(Function.prototype.call),
        isUndef = function(val) {
            return value === undef;
        },
        isDef = function() {
            return complement(isUndef);
        },
        // core
        noop = function() {},
        // fn
        identity = function(value) { return value; },
        constant = function(value) { return function() { return value; }},
        complement = function(fn) { return !apply(fn, undef, arguments) },
        funApply = unbind(Function.prototype.apply),
        funCall = unbind(Function.prototype.call),
        // string
        strSplit = unbind(String.prototype.split),
        strSlice = unbind(String.prototype.slice),
        strIndexOf = unbind(String.prototype.indexOf),
        strToLowerCase = unbind(String.prototype.toLowerCase),
        strToUpperCase = unbind(String.prototype.toUpperCase),
        // array
        arrJoin = unbind(Array.prototype.join),
        arrSlice = unbind(Array.prototype.slice),
        arrPush = unbind(Array.prototype.push),
        arrForEach = Array.prototype.forEach,
        arrReduce = Array.prototype.reduce,
        arrMap = Array.prototype.map,
        arrFilter = Array.prototype.filter,
        arrFind = Array.prototype.find,
        arrSome = Array.prototype.some,
        arrEvery = Array.prototype.every,
        arrEmpty = function(arr) {
            return !(arr.length > 0);
        },
        arrFirst = function(arr) {
            return (
                arrEmpty(arr) ?
                    null :
                    arr[0]);
        },
        // sometimes butFirst
        arrRest = function(arr) {
            return (
                arrEmpty(arr) ?
                    null :
                    arrSlice(arr, 1));
        },
        arrButFirst = arrRest,
        arrLast = function(arr) {
            return (
                    arrEmpty(arr) ?
                        null :
                        arr[arr.length-1]);
        },
        arrButLast = function(arr) {
            return (
                    arrEmpty(arr) ?
                        null :
                        arrSlice(arr, 0, -1));
        },
        // object
        hasProp = Function.prototype.call.bind(Object.prototype.hasOwnProperty),
        objKeys = Object.keys ?
                        function(obj) {
                           return Object.keys(obj);
                        } :
                        function(obj) {
                            var result = [],
                                prop;
                            for(prop in obj) {
                                if(hasProp(obj, prop)) {
                                    result.push(prop);
                                }
                            }
                            return result;
                        },
        objEachOwned = function(obj, fn) {
            var keys = objKeys(obj);
            arrForEach(keys, function(key) {
                fn(obj[key], key, obj);
            });
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
                first: arrFirst,
                last: arrLast,
                butFirst: arrButFirst,      // rest is a common alias
                butLast: arrButLast,
                push: arrPush,
                slice: arrSlice,
                join: arrJoin,
                find: arrFind,
                reduce: arrReduce,
                some: arrSome,               // any is a common alias
                every: arrEvery,             // all is a common alias
                filter: arrFilter,
                each: arrForEach,
                map: arrMap,
                empty: arrEmpty
            },
            object: {
                // find
                // reduce
                // any / every
                // all / some
                // filter
                keys: objKeys,
                map: objMap,
                each: objEach,
                eachOwned: objEachOwned
            },
            fn: {
                call: funCall,
                apply: funApply,
                // bind
                identity: identity,
                constant: constant,
                complement: complement
            },
            is: {
                // undef: isUndef,
                // def: isDef
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


