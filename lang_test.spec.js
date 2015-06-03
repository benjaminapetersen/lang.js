// Borrowing spec from Exercism to start....
// execute tests with :
// jasmine-node .

var lang = require('./lang.js');

describe("lang", function() {

    describe('template', function() {
        describe('.method', function() {
            xit('should...', function() {
                expect('').toBe('');
            });
        })
    });

    describe('lang.fn', function() {
        describe('.call', function() {
            var call = lang.fn.call;
            it('should call a given function', function() {
                expect(call(function() { return 2})).toBe(2);
            });
            it('should call a given function in provided context', function() {
                var obj = { a: 'this is a'};
                expect(call(function() { return this.a}, obj)).toEqual('this is a');
            });
            it('should call a given function and pass on an arbitrary arguments list', function() {
                // each additional argument will be passed on to the function
                // call(function() { console.log(this.a); console.log(arguments); }, obj, 'a', 'b', 1, 2, 3)
            });

        });
        describe('.apply', function() {
            // TODO: 3 tests, symmetry with call
            // TODO: the last test to call the function with an arguments list
        });
        describe('.identity', function() {
            var identity = lang.fn.identity;
            it('should return the first argument provided', function() {
                expect(identity(5)).toBe(5);
                expect(identity([1,2,3])).toEqual([1,2,3]);
            });
        });
        describe('.constant', function() {
            var constant = lang.fn.constant;
            it('should always return the first value provided', function() {
                var user = { name: 'bob', age: 25},
                    userGetter = constant(user);
                // more than one execution
                expect(userGetter()).toEqual(user);
                expect(userGetter()).toEqual(user);
            });
        });
    });

    describe('lang.array', function() {
        describe('.slice', function() {
            var slice = lang.array.slice;
            it('should return a portion of an array as a new array', function() {
                expect(slice([1,2,3,4,5], 2, 5)).toEqual([3, 4, 5]);
            });
        });

        describe('.join', function() {
            var join = lang.array.join;
            it('should join all elements of array into string', function() {
                expect(join(['h','o','b','b','i','t'], '')).toBe('hobbit');
            });
        });

        describe('.each', function() {
            var each = lang.array.each;
            it('should invoke callback once per item in array', function() {
                var count = 0;
                each([1,2,3,4], function() {
                    count++;
                });
                expect(count).toBe(4);
            });
            it('should pass each item in the array to the callback function', function() {
                var items = [1,2,3,4];
                each(items, function(item, i) {
                    expect(item).toEqual(items[i]);
                })
            });
        });

        describe('.map', function() {
            var map = lang.array.map;
            it('should invoke callback once per item in array', function() {
                var count = 0;
                map([1,2,3,4], function() {
                    count++;
                });
                expect(count).toBe(4);
            });
            it('should return a new array of mutated items', function() {
                var arr = map(['a', 'b', 'c'], function(item) {
                        return item + item;
                    });
                expect(arr).toEqual(['aa', 'bb', 'cc']);
            });
        });

    });

    describe('lang.obj', function() {
        describe('.keys', function() {
            var keys = lang.object.keys;
            it('should return a list of the objects keys', function() {
                expect(keys({a:'a', b:'b', kitten: 'meow'})).toEqual(['a','b','kitten']);
            });
        });
        describe('.map', function() {
            var map = lang.object.map;
            it('should return an array of new values from mapped object', function() {
                var arr = map({a:'a', b:'b', kitten: 'meow'}, function(item) {
                    return item+item;
                });
                expect(arr).toEqual(['aa', 'bb', 'meowmeow']);
            });
        });
        describe('.each', function() {
            var each = lang.object.each;
            it('should invoke the callback once per object key', function() {
                var count = 0;
                each({a:'a', b:'b', kitten: 'meow'}, function() {
                    count++;
                });
                expect(count).toBe(3);
            });

            // TODO: the key passed is an array index, as the underlying
            // impl of this function is using the array iterators.  this is
            // not desirable.
            it('should pass value, key and original object to each iteration of callback', function() {
                var object = {a:'a', b:'b', kitten: 'meow'};

                each(object, function(value, key, obj) {
                    expect(value).toEqual(object[key]);
                    expect(obj[key]).toEqual(object[key]);
                });
            });

        });
    });

    describe('.string', function() {
        describe('.indexOf', function() {
            var indexOf = lang.string.indexOf;
            it('should return the index of a letter in a string', function() {
                expect(indexOf("You're nowt but a ninnyhammer, Sam Gamgee", "Sam Gamgee")).toBe(31);
                expect(indexOf("You're nowt but a ninnyhammer, Sam Gamgee", "Hobgoblin")).toBe(-1);
                expect(indexOf("You're nowt but a ninnyhammer, Sam Gamgee", "You")).toBe(0);
            });
        });

        describe('.lower', function() {
            var lower = lang.string.lower;
            it('should lowercase a string', function() {
                expect(lower('Foo')).toBe('foo');
                expect(lower('FOo')).toBe('foo');
                expect(lower('FOO')).toBe('foo');
            });
        });

        describe('.upper', function() {
            var upper = lang.string.upper;
            it('should uppercase a string', function() {
                expect(upper('bar')).toBe('BAR');
                expect(upper('bAr')).toBe('BAR');
                expect(upper('Bar')).toBe('BAR');
            })
        });

        describe('.split', function() {
            var split = lang.string.split;
            it('should split a string by a given separator', function() {
                expect(split('Shizzle Snap', ' ')).toEqual(['Shizzle', 'Snap']);
                expect(split('Shizzle&Snap', '&')).toEqual(['Shizzle', 'Snap']);
                expect(split('a^b^c', '^')).toEqual(['a', 'b', 'c']);
            });
        });

        describe('.slice', function() {
            var slice = lang.string.slice;
            it('should slice a string by beginning and ending params', function() {
                expect(slice("You're nowt but a ninnyhammer, Sam Gamgee", 7, 29)).toBe('nowt but a ninnyhammer');
            });
        });

    });

});