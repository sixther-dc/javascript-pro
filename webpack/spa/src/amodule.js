
import angular from 'angular';

class testController {
    constructor() {
      this.name = 'zhangximeng';
    }
}
  

//angularjs webapp sample
const aModule = angular.module('amodule', [])
    .controller("testController", testController)

export default aModule;