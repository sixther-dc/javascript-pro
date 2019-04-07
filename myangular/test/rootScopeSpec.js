//rootscope由$rootscope服务创建, 其他的scope由controller和directive来创建
//$new用来创建一个子scope

var Scope = require("../src/scope");
var expect = require('chai').expect;

describe("scope inhertance", function () {
    it("子scope会继承rootscope的属性", function () {
        var rootScope = new Scope();
        rootScope.aValue = "river";
        rootScope.bValue = ["one", "two"];
        var childScope = rootScope.$new();
        expect(childScope.aValue).to.be.equals("river");

        //子scope继承rootscope的属性的改变，会影响rootscope的属性
        childScope.bValue.push("three");
        console.log(rootScope.bValue);
        // expect(rootScope.bValue).to.be.equals(["one", "two", "three"])
        //子scope还可以继续使用new来派生scope
        var cchildScope = childScope.$new();
        expect(cchildScope.aValue).to.be.equals("river");
    })

    it("子scope的属性不会被rootScope继承", function () {
        var rootScope = new Scope();
        var childScope = rootScope.$new();
        childScope.aValue = "river";
        expect(rootScope.aValue).to.be.equals(undefined);
    })

    it("可以在scope上watch rootscope的属性", function () {
        var rootScope = new Scope();
        var childScope = rootScope.$new();
        rootScope.aValue = "one";
        childScope.counter = 0;
        childScope.$watch(
            function (scope) {
                return scope.aValue
            },
            function (newValue, oldValue, scope) {
                scope.counter++;
            },
        );
        childScope.$digest();
        expect(childScope.counter).to.be.equals(1);
        //rootscope上属性的改变会引起子scope的digest
        rootScope.aValue = "two";
        childScope.$digest();
        expect(childScope.counter).to.be.equals(2);
    })

    //由于scope的继承是基于原型链的，所有属性的改变与赋值符合原型链的规则
    //改变一个object类型的属性需要特别注意

    //Q: childScope继承了rootScope，那么childScope执行digest的时候变了的$$watches是不是跟rootscope是一样的呢

    it("子scope触发$digest的时候，只遍历本scope的watch", function () {
        var rootScope = new Scope();
        rootScope.aValue = "one"
        var childScope = rootScope.$new();
        rootScope.$watch(
            function (scope) {
                return scope.aValue
            },
            function (newValue, oldValue, scope) {
                scope.watchValue = newValue
            }
        );
        childScope.$digest();
        expect(rootScope.watchValue).to.be.equals(undefined);

        //当在子scope上执行$apply方法是，会对整个树执行digest
        childScope.$apply(function (scope) {});
        expect(rootScope.watchValue).to.be.equals("one");
    })

    //调用rootscope的digest方法时，需要递归去调用其子scope上的digest
    //调用子scope的digest方法是，无需调用父scope的digest方法
    //这就需要没个scope记录其子scope有哪些，然后再digest方法中去调用
    it("rootscope指定digesth方法时，会执行子scope注册的watch函数", function () {
        var rootScope = new Scope();
        var childScope = rootScope.$new();
        childScope.aValue = "one";
        childScope.$watch(
            function (scope) {
                return scope.aValue
            },
            function (newValue, oldValue, scope) {
                scope.watchValue = newValue;
            }
        );
        debugger;
        rootScope.$digest();
        expect(childScope.watchValue).to.be.equals("one");
    })

    //TODO: 指令章节会再次涉及
    it("隔离的scope不会继承rootscope上的任何属性", function () {
        var rootScope = new Scope();
        var childScope = rootScope.$new(true);
        rootScope.aValue = "one";
        expect(childScope.aValue).to.be.equals(undefined);
    })

    it("隔离的scope的$apply也会引发整个tree的digest", function () {
        var parent = new Scope();
        var child = parent.$new(true);
        var child2 = child.$new();
        parent.aValue = 'abc';
        parent.counter = 0;
        parent.$watch(
            function (scope) {
                return scope.aValue;
            },
            function (newValue, oldValue, scope) {
                scope.counter++;
            }
        );
        child2.$apply(function (scope) {});
        expect(parent.counter).to.be.equals(1);
    });

    it("清除一个scope意味着这个scope相关的watch也会被清除，并且不再回被执行", function() {
        var rootScope = new Scope();
        var child = rootScope.$new();
        child.aValue = "one";
        child.counter = 0;
        child.$watch(
            function(scope) {return scope.aValue},
            function(newValue, oldValue, scope) {
                scope.counter ++
            }
        );
        rootScope.$digest();
        expect(child.counter).to.to.equals(1);
        child.$destory();
        expect(child.counter).to.to.equals(1);
    })
})