import sidebarTpl from './sidebar.html';
class sidebarCtrl {
    constructor($rootScope, $scope, $animate, $element) {
        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.$animate = $animate;
        this.$element = $element;
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
//https://docs.angularjs.org/api/ng/service/$animate
//https://blog.csdn.net/Bryans/article/details/81003350
        this.$scope.$on("test", (event, data) => {
            var aaa = angular.copy(this.$rootScope.favoriteEndpoints);
            this.$rootScope.favoriteEndpoints = [];
            // data.forEach((item)=>{
            //     this.$rootScope.favoriteEndpoints.push(aaa[item]);
            // })
            this.$scope.$evalAsync(()=> {
                data.forEach((item)=>{
                    this.$rootScope.favoriteEndpoints.push(aaa[item]);
                })
            });
            // this.$scope.$apply();
        })
    }
    addService() {
        this.$rootScope.favoriteEndpoints.push({
            name: "新服务"
        })
    }

    removeService(index) {
        console.log(index);
        console.log($(this.$element.find("ul")));
        this.$rootScope.favoriteEndpoints.splice(index, 1)
        console.log(this.$rootScope.favoriteEndpoints);
    }
}

sidebarCtrl.$inject = ['$rootScope', '$scope', '$animate', '$element']
const sidebar = {
    controller: sidebarCtrl,
    template: sidebarTpl
}
export default sidebar;