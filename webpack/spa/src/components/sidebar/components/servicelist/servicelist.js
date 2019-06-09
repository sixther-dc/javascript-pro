import servicelistTpl from './servicelist.html';
class servicelistCtrl {
    constructor($rootScope) {
    }

    test() {
        console.log('from controller');
    }
}


servicelistCtrl.$inject = ['$rootScope']
const servicelist = {
    controller: servicelistCtrl,
    template: servicelistTpl
}
export default servicelist;