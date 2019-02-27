import {
	mySync
} from './components/sync';
import {
	func1
} from "./lib/test";
import angular from 'angular';
import uirouter from 'angular-ui-router';
import routing from './app.config';
import aModule from "./amodule";

console.log(func1);
mySync();

class homeController {
	constructor() {
		this.name = '张玺濛';
	}
}


//angularjs webapp sample
angular.module('app', [aModule.name, uirouter])
	.config(routing)
	.controller("homeController", homeController)