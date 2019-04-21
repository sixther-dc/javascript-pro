var parse = require("../src/parse");
var expect = require('chai').expect;

describe("Parse", function () {
    it("处理int类型", function () {
        var fn = parse('42');
        expect(fn()).to.be.equals(42);
    });
    it("处理float类型", function () {
        var fn = parse('4.2');
        expect(fn()).to.be.equals(4.2);
        var fn = parse('.42');
        expect(fn()).to.be.equals(0.42);
    })

    it("处理字符串", function () {
        var fn = parse('"abc"');
        expect(fn()).to.be.equals('abc');
        var fn = parse("'abc'");
        expect(fn()).to.be.equals('abc');
    })

    it("处理true, false, null", function () {
        // var fn = parse('null');
        // expect(fn()).to.be.equals(null);
        var fn = parse('true');
        expect(fn()).to.be.equals(true);
        var fn = parse('false');
        expect(fn()).to.be.equals(false);
    })

    it("处理空格", function(){
        var fn = parse('\n42');
        expect(fn()).to.be.equals(42);
    })

    // it("处理数组", function(){
    //     var fn = parse('[]');
    //     expect(fn()).to.be.equals([])
    // })

    it("从scope中获取属性", function(){
        var fn = parse("aKey");
        expect(fn({aKey: "test"})).to.be.equals("test");
    })
})
// 1,
//表达式的locals参数   会先查询locals上的属性，再查询scope上的属性
//ngClick就是使用了这一功能




//表达式概述，      如何使用ast构建一个表达式语言
//使用表达式查询scope上的属性，以及执行scope上的方法
//操作符的表达式  +  -  *  /
//过滤器  Filter   注册一个Filter   $filter Service 注册，查询，删除功能
//过滤器可以链式调用，  可以传递参数
// filter filter  ngRepeat  内置过滤器
// filter:isOdd   filter:"a"   filter:42     查询value是42的元素
// filter: "!o"  查询没有o的字符串
// filter:{name: "o"}
// 表达式和watch
// Constant detection
// One-time binding
// 一次性表达式  {{ ::user.firstName }}  优化性能   结合express以及watch所做的优化措施, 适合一成不变的属性
// input tracking  也是性能优化的一种
// filter是纯函数
// filter的 $stateful属性  每次$digest都会执行
// 最后，也可以使用表达式给scope赋值



//angularjs 什么时候去操作dom  很重要的问题

