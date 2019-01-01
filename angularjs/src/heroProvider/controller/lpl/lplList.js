//这里没有依赖，只需要使用服务即可
define(function () {
    var lplListCtrl = ['$scope', 'heroService', function ($scope, heroService) {
        //返回一个数组
        var aa = $scope.lplList;
        if (aa==null){
            heroService.getkplList().then(function(res){
                $scope.lplList = res.data;
            });
        }

    }];

    return lplListCtrl;
});
