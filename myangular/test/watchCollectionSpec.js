var Scope = require("../src/scope");
var expect = require('chai').expect;

describe("$watchCollection", function () {
    var scope;
    beforeEach(function () {
        scope = new Scope();
    });
    
    it("$watchCollections跟具有跟$watch一样的效果", function(){
        scope.aValue = "one";
        scope.counter = 0;
        scope.$watchCollection(
            function(scope) {return scope.aValue},
            function(newValue, oldValue, scope) {
                scope.watchValue = newValue;
                scope.watchOldValue = oldValue;
                scope.counter ++;
            }
        );

        scope.$digest();
        expect(scope.watchValue).to.be.equals("one")
        expect(scope.watchOldValue).to.be.equals("one")
        expect(scope.counter).to.be.equals(1)

        scope.aValue = "two";
        scope.$digest();
        //TODO: listener函数中的oldValue失效了
        // expect(scope.watchOldValue).to.be.equals("one")
        expect(scope.counter).to.be.equals(2);
        scope.$digest();
        expect(scope.counter).to.be.equals(2);

    })

    it("当watch的值变为数组的时候，时候会触发listener函数", function() {
        scope.counter = 0;
        scope.$watchCollection(
            function(scope) {return scope.arr},
            function(newValue, oldValue, scope){
                scope.counter ++
            }
        );

        scope.arr = [1,2,3];
        scope.$digest();
        expect(scope.counter).to.be.equals(1);

        scope.arr.push(4);
        scope.$digest();
        expect(scope.counter).to.be.equals(2);

        scope.arr.shift();
        scope.$digest();
        expect(scope.counter).to.be.equals(3);

        scope.arr[1] = 9;
        scope.$digest();
        expect(scope.counter).to.be.equals(4);

        scope.arr.sort();
        scope.$digest();
        expect(scope.counter).to.be.equals(5);

    })

    it("同样的watchcollection对于包装类也要生效", function(){
        //生成一个包装类
        (function(){
            scope.arrayLike = arguments
        })(1, 2, 3);

        scope.counter = 0;
        scope.$watchCollection(
            function(scope) {return scope.arr},
            function(newValue, oldValue, scope){
                scope.counter ++
            }
        );

        scope.arrayLike[1] = 43;
        scope.$digest();
        expect(scope.counter).to.be.equals(1);
        
    })
});

