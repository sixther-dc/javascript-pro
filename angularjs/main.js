require.config({
    baseUrl: './',
    paths: {
        framework: 'src/framework',
        heroProvider: 'src/heroProvider',
        angular: 'src/lib/angular',
        jquery: "src/lib/jquery-3.3.1.min",
        uirouter: "src/lib/angular-ui-router"
        //router: 'js/angular-ui-router'
    },
    shim: {
        'angular': {
            exports: 'angular'
        }
    }
});

//启动angular app
require(['framework/framework', 'angular', 'jquery'], function (framework, angular, $) {
    console.log("test");
    angular.bootstrap($("html"), [framework.name]);
    // angular.element(document).find('body').attr({ 
    //     "ng-controller": "testController" 
    // });
    // angular.element(document).find('html').addClass('ng-app');
});