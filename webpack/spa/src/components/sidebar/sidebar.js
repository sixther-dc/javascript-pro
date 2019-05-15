import sidebarTpl from './sidebar.html';
class sidebarCtrl {
    constructor($rootScope) {
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
        ];
    }
}

sidebarCtrl.$inject = ['$rootScope']
const sidebar = {
    controller: sidebarCtrl,
    template: sidebarTpl
}
export default sidebar;