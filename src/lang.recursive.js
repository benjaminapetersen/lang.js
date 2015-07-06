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
        // array
        arrJoin = '',
        arrSlice = '',
        arrPush = '',
        arrForEach =  function(arr, fn) {
                        return (function loop(iter) {
                                    return (
                                        iter >= arr.length ?
                                            noop() :
                                            loop(iter++, fn(arr[iter], iter, arr))
                                    );
                                })(0);
                      }
        // NOTE: reduce is reportedly the most powerful of iterators, and other
        // iterator functions should really be implemented in terms of it.  My
        // initial go at iterators impements all in terms of each, which seemed
        // the more logical base function to use.
        // TODO: decide if want to prefer built in reduce.
        // problem is built in will err on one test due to requiring initial val
        arrReduce = function(arr, fn, init) {
                        return (function loop(iter, memo) {
                            return (
                                    iter >= arr.length ?
                                        memo :
                                        loop(iter+1, fn(memo, arr[iter], iter, arr)));
                        })(0, init);
                    },
        arrMap = '',
        arrFilter = '',
        arrFind = '',
        arrSome = '',
        arrEvery = '',
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
        objKeys =   Object.keys ?
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


