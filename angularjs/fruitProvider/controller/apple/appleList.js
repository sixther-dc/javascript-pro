//这里没有依赖，只需要使用服务即可
define(function () {
    var appleListCtrl = ['$scope', 'appleService', function ($scope, appleService) {
        //返回一个数组,避免重复查询数据库
        var aa = $scope.appleList;
        if (aa==null){
            $scope.appleList = appleService.getAppleList();
        }
        //$scope.appleList = appleService.getAppleList();
    }];

    return appleListCtrl;
});
