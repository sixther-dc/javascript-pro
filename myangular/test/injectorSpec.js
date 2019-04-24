var Injector = require("../src/injector");
var loader = require("../src/loader");
var expect = require('chai').expect;

//module注册的constant可以通过injector获取到
//module是一系列任务的集合
//invoke queue
//Every module has an invoke queue, and when the module is loaded by an injector, the injector runs the tasks from that module’s invoke queue.

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
})