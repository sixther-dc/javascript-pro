define([], function () {
    var testModule = angular.module("test_module", []);
    //添加系统服务,
    //问题：然后其他模块就可以使用这个系统服务了吗？为什么
    console.log("testModule模块要启动了..");
    testModule.value("test_for_module", "test_for_module");
    return testModule
});