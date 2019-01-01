//这里没有依赖，只需要使用服务即可
define(function () {
    var kplListCtrl = ['$scope', '$rootScope', 'heroService', function ($scope, $rootScope, heroService) {
        //返回一个数组,避免重复查询数据库
        console.log("kpl " + $scope.testValue);
        console.log("kpl rootscope" + $rootScope.testValue);
        $scope.$watch(function(){
            console.log("I am executed when watched");
        },
        function(){
            console.log("我会不会被执行呢,明显不会的")
        });
        //TODO: 这里为什么会被打印两次
        var aa = $scope.kplList;
        if (aa==null){
            heroService.getkplList().then(function(res){
                $scope.kplList = res.data;
            });
        }
    }];

    return kplListCtrl;
});
