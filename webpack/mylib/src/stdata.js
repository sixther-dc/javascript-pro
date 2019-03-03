import angular from 'angular';
import com1 from './component1';

//angularjs webapp sample
const cfdata = angular.module('stdata', [])
    .component('com1', com1);

export default cfdata;
