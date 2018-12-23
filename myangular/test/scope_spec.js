describe("Scope", function () {
    it("can be constructed and used as an object", function () {
        var scope = new Scope();
        scope.aProperty = 1;
        expect(scope.aProperty).toBe(1);
    });

    describe("digest", function () {
        var scope;
        //在每一个测试用例前都执行
        beforeEach(function () {
            scope = new Scope();
        });

        it("calls the listener function of a watch on first $degiest", function () {
            var watchFn = function () { return "wat"; };
            //创建一个可以被调用测试的空函数
            var listenerFn = jasmine.createSpy();
            //设置watch函数，以及触发函数
            scope.$watch(watchFn, listenerFn);
            //调用$digest方法时，所有的watch都会被执行
            scope.$digest();
            //断言触发函数是否被调用
            expect(listenerFn).toHaveBeenCalled();
        });

        //watch函数一般返回一段scope上的数据，所以肯定会调用scope参数的
        it("calls the watch function with the scope as the argument", function () {
            var watchFn = jasmine.createSpy();
            var listenerFn = function() {};

            scope.$watch(watchFn, listenerFn);
            scope.$digest();

            expect(watchFn).toHaveBeenCalledWith(scope);
        });

        //检测wathch的值变化，listener函数会被调用
        it("calls the listeners function when the wathched value changes", function () {
            scope.someValue = "a";
            scope.counter = 0;
            var oldValueGiven;
            scope.$watch(
                function(scope) {return scope.someValue},
                function(newValue, oldValue, scope) {scope.counter++; oldValueGiven = oldValue}
            );

            expect(scope.counter).toBe(0);

            //此时的oldValue为空，所以listener函数是一定会被调用一次的
            scope.$digest();
            expect(scope.counter).toBe(1);
            //第一次调用degest的时候，oldValue为undefined，除非设置了initValue
            expect(oldValueGiven).toBe("a")

            scope.someValue = "b";
            scope.$digest();
            expect(scope.counter).toBe(2);

        });

        //兼容注册没有Listener方法的watcher
        it("may hava watchers that omit the listener function", function () {
            var watchFn = jasmine.createSpy();
            scope.$watch(watchFn);

            scope.$digest();
            expect(watchFn).toHaveBeenCalled();
        });

        //兼容多个watch之间有依赖的场景，取消watch之间的顺序依赖
        it("triggers chained watches in the same digest", function(){
            scope.name = "Jane";
            scope.$watch(
                function(scope) { return scope.nameUpper; },
                function(newValue, oldValue, scope) {
                    if(newValue){
                        scope.initial = newValue.substring(0, 1) + '.';
                    };
                }
            );
            scope.$watch(
                function(scope) { return scope.name; },
                function(newValue, oldValue, scope) {
                    if(newValue){
                        scope.nameUpper = newValue.toUpperCase();
                    };
                }
            );

            scope.$digest();
            expect(scope.initial).toBe("J.");

            scope.name = "Six";
            scope.$digest();
            expect(scope.initial).toBe("S.");
        });

        //如果有两个watcher互相依赖的时候，需要抛出异常
        it("give up on the watches after 10 iterations", function() {
            scope.countA = 0;
            scope.countB = 0;
            scope.$watch(
                function(scope) {return scope.countA},
                function(newValue, oldValue, scope) {
                    scope.countB ++;
                }
            );
            scope.$watch(
                function(scope) {return scope.countB},
                function(newValue, oldValue, scope) {
                    scope.countA ++;
                }
            );
            expect(function(){scope.$digest()}).toThrow();
        });

        //最后一个dirty变成clean的时候则跳出loop， 优化循环次数
        it("end the digest when the last dirty watches is clean", function () {
            scope.array = _.range(100);
            var watchExecutions = 0;

            _.times(100, function(i){
                scope.$watch(
                    function(scope){
                        watchExecutions ++;
                        return scope.array[i];
                    }
                )
            });

            scope.$digest();
            expect(watchExecutions).toBe(200);

            scope.array[0] = 100;
            scope.$digest();
            expect(watchExecutions).toBe(301);
        })

        //当监控的值是一个数组或者对象（引用）的时候===是否还生效,因为对于引用而言===永远是相等的
        it("compares based on value if enabled", function(){
            scope.aArray = [1,3,4];
            var watchExecutions = 0;
            scope.$watch(
                function(scope) { return scope.aArray;},
                function(newValue, oldValue, scope){
                    watchExecutions ++;
                },
                true
            );

            scope.$digest();
            expect(watchExecutions).toBe(1);

            scope.aArray.push(2);
            scope.$digest();
            expect(watchExecutions).toBe(2);

        })
    });
});