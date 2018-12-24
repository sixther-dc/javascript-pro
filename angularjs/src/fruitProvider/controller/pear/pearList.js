//这里没有依赖，只需要使用服务即可
define(function () {
    var pearListCtrl = ['$scope', 'pearService', function ($scope, pearService) {
        //返回一个数组
        var aa = $scope.pearList;
        if (aa==null){
            $scope.pearList = pearService.getPearList();
        }

    }];

    return pearListCtrl;
});
