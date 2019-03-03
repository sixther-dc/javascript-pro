class comController {
    constructor($rootScope) {
        $rootScope.name = "mylib";
        $rootScope.version = "1.0.0";
	};
}

comController.$inject = ["$rootScope"]

export default {
    controller: comController
}