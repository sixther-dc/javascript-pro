//得到kpl列表
define(function () {
    var service = ["$http", "$q", function($http, $q) {
        this.getkplList = function () {
            var def = $q.defer()
            $http.get('/api/kpl/list').then(function(res){
                def.resolve(res)
            }).catch(function(){
                def.reject(err)
            });
            return def.promise
        };
        this.getKplHero = function(id) {
            var def = $q.defer()
            $http.get('/api/kpl/' + id).then(function(res){
                def.resolve(res)
            }).catch(function(){
                def.reject(err)
            });
            return def.promise
        }

    }];
    //这里的服务我也采用和系统服务一样的处理方式
    return service;
});
