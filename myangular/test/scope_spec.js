var Scope = require("../src/scope");
var expect = require('chai').expect;

describe("Scope", function () {
    it("can be constructed and used as an object", function () {
        var scope = new Scope();
        scope.aProperty = 1;
        expect(scope.aProperty).to.be.equal(1);
    });

    describe("digest", function () {
        var scope;
        //在每一个测试用例前都执行
        beforeEach(function () {
            scope = new Scope();
        });

        // it("calls the listener function of a watch on first $degiest", function () {
        //     var watchFn = function () { return "wat"; };
        //     //创建一个可以被调用测试的空函数
        //     var listenerFn = function() {};
        //     //设置watch函数，以及触发函数
        //     scope.$watch(watchFn, listenerFn);
        //     //调用$digest方法时，所有的watch都会被执行
        //     scope.$digest();
        //     //断言触发函数是否被调用
        //     expect(listenerFn).toHaveBeenCalled();
        // });

        // //watch函数一般返回一段scope上的数据，所以肯定会调用scope参数的
        // it("calls the watch function with the scope as the argument", function () {
        //     var watchFn = function() {};
        //     var listenerFn = function() {};

        //     scope.$watch(watchFn, listenerFn);
        //     scope.$digest();

        //     expect(watchFn).toHaveBeenCalledWith(scope);
        // });

        // //检测wathch的值变化，listener函数会被调用
        // it("calls the listeners function when the wathched value changes", function () {
        //     scope.someValue = "a";
        //     scope.counter = 0;
        //     var oldValueGiven;
        //     scope.$watch(
        //         function(scope) {return scope.someValue},
        //         function(newValue, oldValue, scope) {
        //             scope.counter++; 
        //             oldValueGiven = oldValue
        //         }
        //     );

        //     expect(scope.counter).toBe(0);

        //     //此时的oldValue为空，所以listener函数是一定会被调用一次的
        //     scope.$digest();
        //     expect(scope.counter).toBe(1);
        //     //第一次调用degest的时候，oldValue为undefined，除非设置了initValue
        //     expect(oldValueGiven).toBe("a")

        //     scope.someValue = "b";
        //     scope.$digest();
        //     expect(scope.counter).toBe(2);

        // });

        // //兼容注册没有Listener方法的watcher
        // it("may hava watchers that omit the listener function", function () {
        //     var watchFn = function() {};
        //     scope.$watch(watchFn);

        //     scope.$digest();
        //     expect(watchFn).toHaveBeenCalled();
        // });

        // //兼容多个watch之间有依赖的场景，取消watch之间的顺序依赖
        // it("triggers chained watches in the same digest", function(){
        //     scope.name = "Jane";
        //     scope.$watch(
        //         function(scope) { return scope.nameUpper; },
        //         function(newValue, oldValue, scope) {
        //             if(newValue){
        //                 scope.initial = newValue.substring(0, 1) + '.';
        //             };
        //         }
        //     );
        //     scope.$watch(
        //         function(scope) { return scope.name; },
        //         function(newValue, oldValue, scope) {
        //             if(newValue){
        //                 scope.nameUpper = newValue.toUpperCase();
        //             };
        //         }
        //     );

        //     scope.$digest();
        //     expect(scope.initial).toBe("J.");

        //     scope.name = "Six";
        //     scope.$digest();
        //     expect(scope.initial).toBe("S.");
        // });

        // //如果有两个watcher互相依赖的时候，需要抛出异常
        // it("give up on the watches after 10 iterations", function() {
        //     scope.countA = 0;
        //     scope.countB = 0;
        //     scope.$watch(
        //         function(scope) {return scope.countA},
        //         function(newValue, oldValue, scope) {
        //             scope.countB ++;
        //         }
        //     );
        //     scope.$watch(
        //         function(scope) {return scope.countB},
        //         function(newValue, oldValue, scope) {
        //             scope.countA ++;
        //         }
        //     );
        //     expect(function(){scope.$digest()}).toThrow();
        // });

        // //最后一个dirty变成clean的时候则跳出loop， 优化循环次数
        // it("end the digest when the last dirty watches is clean", function () {
        //     scope.array = _.range(100);
        //     var watchExecutions = 0;

        //     _.times(100, function(i){
        //         scope.$watch(
        //             function(scope){
        //                 watchExecutions ++;
        //                 return scope.array[i];
        //             }
        //         )
        //     });

        //     scope.$digest();
        //     expect(watchExecutions).toBe(200);

        //     scope.array[0] = 100;
        //     scope.$digest();
        //     expect(watchExecutions).toBe(301);
        // })

        // //当监控的值是一个数组或者对象（引用）的时候===是否还生效,因为对于引用而言===永远是相等的
        // it("compares based on value if enabled", function(){
        //     scope.aArray = [1,3,4];
        //     scope.watchExecutions = 0;
        //     scope.$watch(
        //         function(scope) { return scope.aArray;},
        //         function(newValue, oldValue, scope){
        //             scope.watchExecutions ++;
        //         },
        //         true
        //     );

        //     scope.$digest();
        //     expect(scope.watchExecutions).toBe(1);

        //     scope.aArray.push(2);
        //     scope.$digest();
        //     expect(scope.watchExecutions).toBe(2);

        // })

        //
        it("嵌套watch的场景", function(){
            scope.aValue = 'abc';
            scope.counter = 0;
            scope.$watch(
                function() {return scope.aValue},
                function(newValue, oldValue, scope) {
                    //该watch执行不到
                    //第一次digestonce只循环外层的watch，执行完后发现是脏的，并且lastdirtywath为最外层的watch。
                    //第二次digentonce的时候$$watch里有两个watch，当处理第一watch的时候，发现已经干净了， 并且lastdirtywatch是自己，就退出脏检查了
                    //因此不会执行第二个watch
                    scope.$watch(
                        function() {return scope.aValue},
                        function(newValue, oldValue, scope) {
                            scope.counter ++
                        }
                    )
                }
            );
            scope.$digest();
            // console.log(scope.$$watchers);
            expect(scope.counter).to.be.equal(1);
        });

        it("正确处理NaN,  因为NaN不等于NaN", function(){
            scope.aValue = 0 / 0;
            scope.counter = 0;
            scope.$watch(
                function() {return scope.aValue},
                function(newValue, oldValue, scope) {
                    scope.counter ++
                }
            )
            scope.$digest();
            expect(scope.counter).to.be.equal(1);

        })

        it("$eval服务的用法", function(){
            scope.aValue = "aaa";
            var result = scope.$eval(function(scope){
                return scope.aValue
            });
            expect(result).to.be.equal("aaa");
        })

        it("带参数的$eval服务的用法", function(){
            scope.aValue = 42;
            var result = scope.$eval(function(scope, arg){
                return scope.aValue + arg
            }, 2);
            expect(result).to.be.equal(44);
        })
        it("$apply方法的用法, 用来在angular框架之外执行某些事情，比如setTimeout", function(){
            scope.aValue = "aa";
            scope.counter = 0;
            scope.$watch(
                function(scope) {return scope.aValue},
                function(newValue, oldValue, scope) {
                    scope.counter ++
                }
            );

            scope.$digest();
            expect(scope.counter).to.be.equal(1);
            scope.$apply(function(){
                scope.aValue = "bb"
            });
            expect(scope.counter).to.be.equal(2);

        })

        //$timeout会开启新一轮的digest，而evalAsync则不会
        it("$evalAsync在一个digest周期内延迟执行, 更灵活的$timeout", function(){
            scope.aValue = "aa";
            scope.asyncEvaluated = false;
            scope.asyncEvaluatedImmediately = false;
            scope.$watch(
                function(scope) {return scope.aValue},
                function(newValue, oldValue, scope) {
                    scope.$evalAsync(function(scope){
                        scope.asyncEvaluated = true;
                    });
                    scope.asyncEvaluatedImmediately = scope.asyncEvaluated;
                }

            )

            //执行了两次digentonce函数，第一次调用了evalAsync添加进了任务队列
            //第二次执行任务队列中的任务， 但由于检测到dirty watch就是笨watch
            //故第二次的listener函数没有被执行
            scope.$digest();
            expect(scope.asyncEvaluatedImmediately).to.be.equal(false);
            expect(scope.asyncEvaluated).to.be.equal(true);
        })
    });
});