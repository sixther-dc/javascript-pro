import servicelistTpl from './servicelist.html';
class servicelistCtrl {
    constructor($rootScope) {
    }
}

servicelistCtrl.$inject = ['$rootScope']
const servicelist = {
    controller: servicelistCtrl,
    template: servicelistTpl
}
export default servicelist;