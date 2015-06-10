var expect = chai.expect;

describe("lang", function() {

    // describe('lang.fn', function() {
    //     describe('.call', function() {
    //         var call = lang.fn.call;
    //         it('should call a given function', function() {
    //             expect(call(function() { return 2})).toBe(2);
    //         });
    //         it('should call a given function in provided context', function() {
    //             var obj = { a: 'this is a'};
    //             expect(call(function() { return this.a}, obj)).toEqual('this is a');
    //         });
    //         it('should call a given function and pass on an arbitrary arguments list', function() {
    //             // each additional argument will be passed on to the function
    //             // call(function() { console.log(this.a); console.log(arguments); }, obj, 'a', 'b', 1, 2, 3)
    //         });

    //     });
    //     describe('.apply', function() {
    //         // TODO: 3 tests, symmetry with call
    //         // TODO: the last test to call the function with an arguments list
    //     });
    //     describe('.identity', function() {
    //         var identity = lang.fn.identity;
    //         it('should return the first argument provided', function() {
    //             expect(identity(5)).toBe(5);
    //             expect(identity([1,2,3])).toEqual([1,2,3]);
    //         });
    //     });
    //     describe('.constant', function() {
    //         var constant = lang.fn.constant;
    //         it('should always return the first value provided', function() {
    //             var user = { name: 'bob', age: 25},
    //                 userGetter = constant(user);
    //             // more than one execution
    //             expect(userGetter()).toEqual(user);
    //             expect(userGetter()).toEqual(user);
    //         });
    //     });
    // });

    describe('lang.array', function() {
        describe('.slice', function() {
            var slice = lang.array.slice;
            it('should return a portion of an array as a new array', function() {
                expect(slice([1,2,3,4,5], 2, 5)).to.eql([3, 4, 5]);
            });
        });

        describe('.join', function() {
            var join = lang.array.join;
            it('should join all elements of array into string', function() {
                expect(join(['h','o','b','b','i','t'], '')).to.eql('hobbit');
            });
        });

        describe('.empty', function() {
            var empty = lang.array.empty;
            it('should return true if the array is empty', function() {
                expect(empty([])).to.eql(true);
            });
            it('should return false if the array is not empty', function() {
                expect(empty([1,2,3])).to.eql(false);
                expect(empty([undefined])).to.eql(false);
                expect(empty([null])).to.eql(false);
                expect(empty([[]])).to.eql(false);
                expect(empty([{}])).to.eql(false);
            });
        });

        describe('.first', function() {
            var first = lang.array.first;
            it('should return the first item in an array', function() {
                expect(first([22,33,44])).to.equal(22);
            });
        });
        describe('.butFirst', function() {
            var butFirst = lang.array.butFirst;
            it('should return the everything but the first item in an array', function() {
                expect(butFirst([22,33,44])).to.eql([33,44]);
            });
        });
        describe('.last', function() {
            var last = lang.array.last;
            it('should return the last item in an array', function() {
                expect(last([22,33,44])).to.eql(44);
            });
        });
        describe('.butLast', function() {
            var butLast = lang.array.butLast;
            it('should return the everything but the last item in an array', function() {
                expect(butLast([22,33,44])).to.eql([22,33]);
            });
        });

        describe('.each', function() {
            var each = lang.array.each;
            it('should invoke callback once per item in array', function() {
                var count = 0;
                each([1,2,3,4], function() {
                    count++;
                });
                expect(count).to.eql(4);
            });
            it('should pass each item in the array to the callback function', function() {
                var items = [1,2,3,4];
                each(items, function(item, i) {
                    expect(item).to.eql(items[i]);
                })
            });
        });

        describe('.map', function() {
            var map = lang.array.map;
            it('should invoke callback once per item in array', function() {
                var count = 0;
                map([1,2,3,4], function() {
                    return count++;
                });
                expect(count).to.eql(4);
            });
            it('should return a new array of mutated items', function() {
                var arr = map(['a', 'b', 'c'], function(item, i, values) {
                        return item + item;
                    });
                expect(arr).to.eql(['aa', 'bb', 'cc']);
            });
        });

        describe('.reduce', function() {
            var reduce = lang.array.reduce;
            it('should reduce an array to a single output value based on the third argument accumulator', function() {
                var sum = reduce([5,10,15], function(prev, current, i, array) {
                    return prev + current;
                }, 0);

                expect(sum).to.eql(30);
            });
            it('should take an optional initial value as the third argument', function() {
                var sum = reduce([5,10,15], function(prev, current, i, array) {
                    return prev + current;
                }, 40);

                expect(sum).to.eql(70);
            });
            it('should return the optional initial value if an empty array is provided', function() {
                var sum = reduce([], function(prev, current, i, array) {
                    return prev + current;
                }, 40);

                expect(sum).to.eql(40);
            });
            it('should return undefined if an empty array is provided with no initial value', function() {
                var sum = reduce([], function(prev, current, i, array) {
                    return prev + current;
                });
                // note: this is not true of native Array.prototype.reduce!
                // if an empty array and no initial value, it will throw a TypeError
                expect(sum).to.eql(undefined);
            });
        });

        describe('filter', function() {
            var filter = lang.array.filter;
            it('should iterate an array, returning all elements predicate returns truthy for', function() {
                var items = filter([0,50,75,101,103,105], function(val) {
                    return (val > 100);
                });
                expect(items).to.eql([101,103,105]);
            });
            xit('should call predicate with third argument context if provided', function() {
                // This test is a nice to have. will worry about it later.
            });
        });

        describe('.find', function() {
            var find = lang.array.find;
            it('should return the first item in a collection for which the predicate returns true', function() {
                expect(find([1,2,3,4,5,6,7], function(item, i) {
                    return item === 6;
                })).to.eql(6);
            });
            it('should return undefind if no item matches the predicate test', function() {
                expect(find([1,2,3,4,5], function(item, i) {
                    return item === 99999;
                })).to.equal(undefined);
            });
        });

        describe('.some/.any', function() {
            var some = lang.array.some;
            it('should return true if any item in the array passes the test predicate (truthy)', function() {
                expect(some([1,2,3,4], function(item, i) {
                    return item === 3;
                })).to.eql(true)
            });

            xit('should call predicate with third argument context if provided')
        });

        describe('.every/.all', function() {
            var every = lang.array.every;
            // should it call the predicate once for each item? not necessary if a fail happens!
            it('should return true if all items in the array pass the test predicate', function() {
                expect(every([1,2,3,4], function(item, i) {
                    return item < 10;
                })).to.eql(true);

                expect(every([1,2,3,4], function(item, i) {
                    return item > 10;
                })).to.eql(false);
            });
        })

    });

    describe('lang.obj', function() {
        describe('.keys', function() {
            var keys = lang.object.keys;
            it('should return a list of the objects keys', function() {
                expect(keys({a:'a', b:'b', kitten: 'meow'})).to.eql(['a','b','kitten']);
            });
        });
        describe('.eachOwned', function() {
            var eachOwned = lang.object.eachOwned;
            it('should call the predicate function once for each of the objects own keys', function() {
                var count = 0,
                    obj = {a:1,b:2,c:3};
                eachOwned(obj, function(value, key, object) {
                    count++;
                    expect(object[key]).to.eql(object[key]);
                    expect(value).to.eql(obj[key]);
                });
                expect(count).to.eql(3);
            });
        })
    //     describe('.map', function() {
    //         var map = lang.object.map;
    //         it('should return an array of new values from mapped object', function() {
    //             var arr = map({a:'a', b:'b', kitten: 'meow'}, function(item) {
    //                 return item+item;
    //             });
    //             expect(arr).toEqual(['aa', 'bb', 'meowmeow']);
    //         });
    //     });
    //     describe('.each', function() {
    //         var each = lang.object.each;
    //         it('should invoke the callback once per object key', function() {
    //             var count = 0;
    //             each({a:'a', b:'b', kitten: 'meow'}, function() {
    //                 count++;
    //             });
    //             expect(count).toBe(3);
    //         });

    //         // TODO: the key passed is an array index, as the underlying
    //         // impl of this function is using the array iterators.  this is
    //         // not desirable.
    //         it('should pass value, key and original object to each iteration of callback', function() {
    //             var object = {a:'a', b:'b', kitten: 'meow'};

    //             each(object, function(value, key, obj) {
    //                 expect(value).toEqual(object[key]);
    //                 expect(obj[key]).toEqual(object[key]);
    //             });
    //         });

    //     });
    });

    // describe('.string', function() {
    //     describe('.indexOf', function() {
    //         var indexOf = lang.string.indexOf;
    //         it('should return the index of a letter in a string', function() {
    //             expect(indexOf("You're nowt but a ninnyhammer, Sam Gamgee", "Sam Gamgee")).toBe(31);
    //             expect(indexOf("You're nowt but a ninnyhammer, Sam Gamgee", "Hobgoblin")).toBe(-1);
    //             expect(indexOf("You're nowt but a ninnyhammer, Sam Gamgee", "You")).toBe(0);
    //         });
    //     });

    //     describe('.lower', function() {
    //         var lower = lang.string.lower;
    //         it('should lowercase a string', function() {
    //             expect(lower('Foo')).toBe('foo');
    //             expect(lower('FOo')).toBe('foo');
    //             expect(lower('FOO')).toBe('foo');
    //         });
    //     });

    //     describe('.upper', function() {
    //         var upper = lang.string.upper;
    //         it('should uppercase a string', function() {
    //             expect(upper('bar')).toBe('BAR');
    //             expect(upper('bAr')).toBe('BAR');
    //             expect(upper('Bar')).toBe('BAR');
    //         })
    //     });

    //     describe('.split', function() {
    //         var split = lang.string.split;
    //         it('should split a string by a given separator', function() {
    //             expect(split('Shizzle Snap', ' ')).toEqual(['Shizzle', 'Snap']);
    //             expect(split('Shizzle&Snap', '&')).toEqual(['Shizzle', 'Snap']);
    //             expect(split('a^b^c', '^')).toEqual(['a', 'b', 'c']);
    //         });
    //     });

    //     describe('.slice', function() {
    //         var slice = lang.string.slice;
    //         it('should slice a string by beginning and ending params', function() {
    //             expect(slice("You're nowt but a ninnyhammer, Sam Gamgee", 7, 29)).toBe('nowt but a ninnyhammer');
    //         });
    //     });

    // });

});