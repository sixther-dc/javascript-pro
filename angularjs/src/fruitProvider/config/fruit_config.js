define([
    'fruitProvider/controller/apple/appleList.js',
    'fruitProvider/controller/pear/pearList.js',
    'fruitProvider/service/apple', 
    'fruitProvider/service/pear',
    'angular',
    'uirouter'
], function (appleListCtrl, pearListCtrl, appleService, pearService, angular, uirouter) {
    //依赖路由文件
    var fruit = angular.module("fruit", [uirouter]);
    //添加路由，自己的路由自己管理
    fruit.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("home");
        $stateProvider
            .state('appleList', {
                url: '/appleList',
                templateUrl: 'fruitProvider/view/apple/appleList.html',
                controller: 'appleListCtrl'
            })
            .state('pearList', {
                url: '/pearList',
                templateUrl: 'fruitProvider/view/pear/pearList.html',
                controller: 'pearListCtrl'
            });
    });
    //添加两个服务
    fruit.service("appleService", appleService);
    fruit.service("pearService", pearService);

    //添加两个controller
    fruit.controller("appleListCtrl",appleListCtrl);
    fruit.controller("pearListCtrl",pearListCtrl);

    //返回该模块
    return fruit;
});
