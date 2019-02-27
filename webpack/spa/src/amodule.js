
import angular from 'angular';

class testController {
    constructor() {
      this.name = '段超';
    }
}
  

//angularjs webapp sample
const aModule = angular.module('amodule', [])
    .controller("testController", testController)

export default aModule;