define([
    'heroProvider/controller/kpl/kplList.js',
    'heroProvider/controller/kpl/kplHero.js',
    'heroProvider/controller/lpl/lplList.js',
    'heroProvider/controller/jstest.js',
    'heroProvider/service/hero', 
    'angular',
    'uirouter'
], function (kplListCtrl, kplHeroCtrl, lplListCtrl, jsTestCtrl, heroService, angular, uirouter) {
    //依赖路由文件
    var hero = angular.module("hero", [uirouter]);
    //添加路由，自己的路由自己管理
    hero.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/kpl/list");
        $stateProvider
            .state('kplList', {
                url: '/kpl/list',
                template: require('heroProvider/view/kpl/kplList.html'),
                controller: 'kplListCtrl'
            })
            .state('lplList', {
                url: '/lpl/list',
                template: require('heroProvider/view/lpl/lplList.html'),
                controller: 'lplListCtrl'
            })
            .state('theKpiHero', {
                url: '/kpl/{id}',
                template: require('heroProvider/view/kpl/kpl_hero.html'),
                controller: 'kplHeroCtrl'
            })
            .state('testcss', {
                url: '/testcss',
                template: require('heroProvider/view/csstest.html'),
            })
            .state('testjs', {
                url: '/testjs',
                template: require('heroProvider/view/jstest.html'),
                controller: "jsTestCtrl"

            });
    });
    //添加服务
    hero.service("heroService", heroService);

    //添加controller
    hero.controller("kplListCtrl", kplListCtrl);
    hero.controller("kplHeroCtrl", kplHeroCtrl);
    hero.controller("lplListCtrl" ,lplListCtrl);
    hero.controller("jsTestCtrl" ,jsTestCtrl);


    //返回该模块
    return hero;
});
