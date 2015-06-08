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
        // may change demethodize to 'unbind'?
        // or demethodize = function(fn) { return Function.prototype.call.bind(fn) }
        demethodize = Function.prototype.bind.bind(Function.prototype.call),
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
        arrSlice = demethodize(Array.prototype.slice),
        arrPush = demethodize(Array.prototype.push),
        arrForEach = //Array.prototype.forEach ?
                    false ?
                        demethodize(Array.prototype.forEach) :
                        function(arr, fn) {
                            var i = 0,
                                length;
                            if(arrEmpty(arr)) {
                                return arr;
                            }
                            length = arr.length;
                            for(i; i < length; ++i) {
                                fn(arr[i], i);
                            }
                        },
        // NOTE: reduce is reportedly the most powerful of iterators, and other
        // iterator functions should really be implemented in terms of it.  My
        // initial go at iterators impements all in terms of each, which seemed
        // the more logical base function to use.
        // TODO: decide if want to prefer built in reduce.
        // problem is built in will err on one test due to requiring initial val
        arrReduce = //Array.prototype.reduce ?
                    false ?
                        demethodize(Array.prototype.reduce) :
                        function(arr, fn, memo) {
                            // this is ugly, would prefer to fail gracefully?
                            // prob good practice to always provide the intended
                            // memo (type)
                            // if(isUndef(memo)) {
                            //     return new TypeError('Reduce of empty array with no initial value');
                            // }
                            // if(arrEmpty(arr)) {
                            //     return memo;
                            // }
                            arrForEach(arr, function(item, index) {
                                memo = fn(memo, item, index, arr);
                            });
                            return memo;
                        },
                        // for loop?
                        //function(arr, fn, initial) {
                        //
                        //},
                        // recursive?
                        // function(arr, fn, initial) {
                        //   arrEmpty(arr) ?
                        //      ... :
                        //      ...
                        // },
        arrMap = //Array.prototype.map ?
                false ?
                    demethodize(Array.prototype.map) :
                    function(arr, fn) {
                        return arrReduce(arr, function(prev, current, i, list) {
                            // gotcha here, push returns the new length, not a new
                            // array including the added items.
                            arrPush(prev, fn(current, i, list));
                            return prev;
                        }, []);
                    },
        arrFilter = // Array.prototype.filter ?
                    false ?
                        demethodize(Array.prototype.filter) :
                        function(arr, fn, context) {
                            return arrReduce(arr, function(prev, current, i, list) {
                                if(fn(current, i, list)) {
                                    arrPush(prev, current);
                                }
                                return prev;
                            }, []);
                        },
        arrFind = // Array.prototype.find ?
                    false ?
                        demethodize(Array.prototype.find) :
                        function(arr, fn, context) {
                            var i=0,
                                length,
                                found;
                            if(arrEmpty(arr)) {
                                return null;
                            }
                            arrForEach(arr, function(item, i, arr) {
                                if(!!fn(item, i)) {
                                    if(!found) {
                                        found = item;
                                    }
                                }
                            });
                            return found;
                        },
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
                first: arrFirst,
                last: arrLast,
                butFirst: arrButFirst,
                butLast: arrButLast,
                push: arrPush,
                slice: arrSlice,
                join: arrJoin,
                find: arrFind,
                reduce: arrReduce,
                // any / some
                // every / all
                filter: arrFilter,
                each: arrForEach,
                map: arrMap,
                empty: arrEmpty
                // first: arrFirst,
                // rest: arrRest
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


