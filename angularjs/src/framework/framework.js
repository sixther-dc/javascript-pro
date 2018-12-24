define(['backend/backend', 'fruitProvider/config/fruit_config'], function (backend, fruit) {
    var dependency = [
        fruit.name
    ];
    var framework = angular.module("framework", dependency);
    //添加系统服务,
    //问题：然后其他模块就可以使用这个系统服务了吗？为什么
    framework.service("backend", backend);

    var testController = function($scope, $rootScope) {
        $scope.testValue = "duanchao";
        $rootScope.testValue = "duanchao";
        console.log("I am parent controller");
    }

    framework.controller("testController", testController);
    return framework
});
