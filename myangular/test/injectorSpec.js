var Injector = require("../src/injector");
var loader = require("../src/loader");
var expect = require('chai').expect;

//module注册的constant可以通过injector获取到
//module是一系列任务的集合
//invoke queue
//Every module has an invoke queue, and when the module is loaded by an injector, the injector runs the tasks from that module’s invoke queue.

//Circular dependency found: a <- c <- b <- a'
describe("module系统测试用例", function () {
    var window;
    var injector;
    var angular;
    beforeEach(function () {
        window = {};
        delete window.angular;
        loader(window);
        angular = window.angular;
        injector = new Injector(window);

    });
    it("injector服务", function () {
        var module = window.angular.module("myModule", []);
        module.constant("aConstant", 42);
        var myInjector = injector.createInjector([module.name]);
        expect(myInjector.has('aConstant')).to.be.equals(true);
        expect(myInjector.get('aConstant')).to.be.equals(42);
    });

    it('有模块依赖的情况', function () {
        var module1 = angular.module('myModule', []);
        var module2 = angular.module('myOtherModule', ['myModule']);
        module1.constant('aConstant', 42);
        module2.constant('anotherConstant', 43);
        var myInjector = injector.createInjector(['myOtherModule']);
        expect(myInjector.has('aConstant')).to.be.equals(true);
        expect(myInjector.has('anotherConstant')).to.be.equals(true);
    });

    it("依赖注入", function(){
        var module = angular.module('myModule', []);
        module.constant("a", 1);
        module.constant("b", 2);
        var myInjector = injector.createInjector(["myModule"]);
        var fn = function(one, two) {
            return one + two;
        };
        fn.$inject = ["a", "b"];
        expect(myInjector.invoke(fn)).to.be.equals(3);
        expect(myInjector.annotate(fn)).to.deep.equals(["a", "b"])

        var obj = {
            two: 4,
            fn: function(one) {
                return one + this.two
            }
        };
        //这里关键是要处理this的指向
        obj.fn.$inject = ["a"];
        expect(myInjector.invoke(obj.fn, obj)).to.be.equals(5);
    })

    it("数组形式的依赖注入", function(){
        var module = angular.module('myModule', []);
        module.constant("a", 1);
        module.constant("b", 2);
        var myInjector = injector.createInjector(["myModule"]);
        var fn = ["a", "b", function(a, b) { return a + b}];
        expect(myInjector.annotate(fn)).to.deep.equals(["a", "b"])
        expect(myInjector.invoke(fn)).to.be.equal(3)
    })
    
    it("依赖注入支持构造函数", function(){
        var module = angular.module('myModule', []);
        module.constant("a", 1);
        module.constant("b", 2);
        var myInjector = injector.createInjector(["myModule"]);
        function Type(a, b){
            this.result = a + b
        };
        Type.prototype.size = 50;
        Type.$inject = ["a", "b"];
        var instance = myInjector.instantiate(Type);
        expect(instance.result).to.be.equal(3);
        expect(instance.size).to.be.equal(50);
    })

    it("provider", function(){
        var module = angular.module('myModule', []);
        //priovider就是一个有$get方法的js对象
        module.constant('b', 1);
        module.provider('a', {
            $get: function(){
                return 42
            }
        });
        module.provider('c', {
            $get: ["b", function(b){
                return b + 3
            }]
        })
        var myInjector = injector.createInjector(["myModule"]);
        expect(myInjector.get("a")).to.be.equal(42);
        expect(myInjector.get("c")).to.be.equal(4);
    })

    it("依赖的懒实例化", function(){
        var module = angular.module('myModule', []);

        module.provider('d', {
            $get: ["a", function(a){
                return a + 1
            }]
        });
        //此时b的值还不可用，所以计算a的值将为NaN
        module.provider('a', {
            $get: ["b", function(b){
                return b + 1
            }]
        });

        module.provider('b', {
            $get: function(){
                return 1
            }
        });
        var myInjector = injector.createInjector(["myModule"]);
        expect(myInjector.get("b")).to.be.equal(1);
        expect(myInjector.get("a")).to.be.equal(2);
        //TODO: 这个还没有解决
        // expect(myInjector.get("d")).to.be.equal(3);
    })
    it("provider都是单例", function(){
        var module = angular.module('myModule', []);

        module.provider('a', {
            $get: function(a){
                return {}
            }
        });
        var myInjector = injector.createInjector(["myModule"]);
        expect(myInjector.get("a")).to.be.equal(myInjector.get("a"));
    })
    
    it("使用构造函数来注册provider", function(){
        var module = angular.module('myModule', []);
        module.provider('a', function Aprovider(){
            this.$get = function(){
                return 1
            }
        });
        var myInjector = injector.createInjector(["myModule"]);
        expect(myInjector.get("a")).to.be.equal(1);
    })
})
