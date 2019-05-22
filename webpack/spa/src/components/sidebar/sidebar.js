import sidebarTpl from './sidebar.html';
class sidebarCtrl {
    constructor($rootScope) {
        this.$rootScope = $rootScope;
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
    }
    addService() {
        this.$rootScope.favoriteEndpoints.push({
            name: "新服务"
        })
    }

    removeService(index) {
        console.log(index);
        this.$rootScope.favoriteEndpoints.splice(index, 1)
    }
}

sidebarCtrl.$inject = ['$rootScope']
const sidebar = {
    controller: sidebarCtrl,
    template: sidebarTpl
}
export default sidebar;