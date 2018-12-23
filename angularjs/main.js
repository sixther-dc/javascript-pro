require.config({
    baseUrl: './',
    paths: {
        framework: 'framework',
        fruitProvider: 'fruitProvider',
        backend: 'systemService',
        //router: 'js/angular-ui-router'
    }
});

//启动angular app
require(['framework/framework'], function (framework) {
    angular.bootstrap($("html"), [framework.name]);
});