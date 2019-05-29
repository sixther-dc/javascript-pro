import sidebarTpl from './sidebar.html';
class sidebarCtrl {
    constructor($rootScope, $scope, $animate, $element, $timeout, $q) {
        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.$animate = $animate;
        this.$element = $element;
        this.$timeout = $timeout;
        this.$q = $q;
        $rootScope.favoriteEndpoints = [{
                name: "弹性云计算器"
            },
            {
                name: "虚拟私有云"
            },
            {
                name: "DNS"
            },
            {
                name: "数据库"
            },
            {
                name: "边缘计算"
            },
            {
                name: "人工智能"
            }
        ];
        this.$scope.$on("test", (event, data) => {
            var aaa = angular.copy(this.$rootScope.favoriteEndpoints);
            this.$rootScope.favoriteEndpoints = [];
            this.$scope.$evalAsync(() => {
                data.forEach((item) => {
                    aaa[item].flag = false;
                    this.$rootScope.favoriteEndpoints.push(aaa[item]);
                })
            });
        });

        this.$scope.$on("removeItem", (event, index) => {
            this.$scope.$evalAsync(() => {
                this.$rootScope.favoriteEndpoints.splice(index, 1)
            });
        });

    }
    addService() {
        this.$rootScope.favoriteEndpoints.push({
            name: "新服务",
            flag: true
        });
    }
}

sidebarCtrl.$inject = ['$rootScope', '$scope', '$animate', '$element', '$timeout', '$q']
const sidebar = {
    controller: sidebarCtrl,
    template: sidebarTpl
}
export default sidebar;