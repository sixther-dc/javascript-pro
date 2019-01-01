define(['heroProvider/config/hero_config','framework/testmodule'], function (hero, test) {
    var dependency = [
        hero.name,
        test.name
    ];
    var framework = angular.module("framework", dependency);
    console.log("framework模块要启动了..");

    //定义一个provider
    var testProvider = function(){
        baseUrl = "";
        //一定要有$get方法
        this.$get = function() {
            return {
                baseUrl: this.baseUrl
            }
        }
    }

    framework.provider("test_provider", testProvider);
    //定义一个controller
    var testController = function($scope, $rootScope, test_for_module, test_provider) {
        $scope.testValue = "duanchao";
        $rootScope.testValue = "duanchao";
        console.log("I am parent controller");
        console.log(test_for_module + " from dependency module");
        console.log(test_provider.baseUrl + ' from provider');
    }

    testController.$injector = ["$scope", "$rootScope", "test_for_module", "test_provider"];

    framework.controller("testController", testController);

    //注意引用provider要添加Provider后缀
    framework.config(["test_providerProvider", function(test_provider){
        test_provider.baseUrl = "www.huawei.com";
        console.log("这里可以配置provider,并且它在run方法之前执行");
    }])

    //可执行的语句执行完后编执行run方法
    //在所有controller初始化之前执行
    framework.run([function(){
        console.log("run在config方法之后，所有controller初始化之前执行");
    }]);

    return framework
});
