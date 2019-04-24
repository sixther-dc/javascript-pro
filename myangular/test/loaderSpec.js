var loader = require("../src/loader");
var expect = require('chai').expect;

describe("module系统测试用例", function(){
    var window;
    beforeEach(function () {
        window = {};
        delete window.angular;
        loader(window);
    });
    it("angular是一个window上的属性", function(){
        expect(window.angular).to.not.be.undefined;
        expect(window.angular.module).to.not.be.undefined;
    });

    it("注册模块", function(){
        var myModule = window.angular.module("myModule", ["myOtherModule"]);
        console.log(myModule);
        expect(myModule).to.not.be.undefined;
        expect(myModule.name).to.be.equals("myModule");
        expect(myModule.requires).to.deep.equals(["myOtherModule"])

        var gotModule = window.angular.module("myModule");
        expect(gotModule).to.be.equals(myModule);
    })
})