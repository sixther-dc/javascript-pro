// event用于scope之间的传递消息
//基于发布 / 订阅模型
//事件可以向上  emmitng  event   向下  broadcast event
//$on注册的函数可以被emitting以及broadcast事件接收

//预告  angular.element  原生事件相关

var Scope = require("../src/scope");
var expect = require('chai').expect;

describe("scope Event", function () {
    var parent;
    var scope;
    var child;
    var isolatedChild;
    beforeEach(function () {
        parent = new Scope();
        scope = parent.$new();
        child = scope.$new();
        isolatedChild = scope.$new(true);
    });

    it("$on注册的函数是被保存在了一个内部变量中", function () {
        var listener1 = function() {};
        var listener2 = function() {};
        var listener3 = function() {};
        scope.$on("oneEvent", listener1);
        scope.$on("oneEvent", listener2);
        scope.$on("twoEvent", listener3);

        // expect(scope.$$listeners).to.be.equals({
        //     oneEvent: [listener1, listener2],
        //     twoEvent: [listener3]
        // })

     })
})