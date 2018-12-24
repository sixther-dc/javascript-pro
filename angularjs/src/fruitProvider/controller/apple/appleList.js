//这里没有依赖，只需要使用服务即可
define(function () {
    var appleListCtrl = ['$scope', '$rootScope', 'appleService', function ($scope, $rootScope, appleService) {
        //返回一个数组,避免重复查询数据库

        console.log("apple" + $scope.testValue);
        console.log("apple rootscope" + $rootScope.testValue);
        $scope.$watch(function(){
            console.log("I am executed when watched");
        },
        function(){
            console.log("我会不会被执行呢")
        });
        //TODO: 这里为什么会被打印两次
        var aa = $scope.appleList;
        if (aa==null){
            $scope.appleList = appleService.getAppleList();
        }
        //$scope.appleList = appleService.getAppleList();
    }];

    return appleListCtrl;
});
