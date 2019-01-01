//这里没有依赖，只需要使用服务即可
define(function () {
    var kplHeroCtrl = [
        '$scope',
        'heroService', 
        '$stateParams',
        function ($scope, heroService, $stateParams) {
            console.log("I am kplhero controller");
            var heroId = $stateParams.id;
            //如何获取路由参数
            //TODO: 这里为什么会被打印两次
            var aa = $scope.kplList;
            if (aa==null){
                heroService.getKplHero(heroId).then(function(res){
                    $scope.kplHero = res.data;
                });
            }
    }];

    return kplHeroCtrl;
});
