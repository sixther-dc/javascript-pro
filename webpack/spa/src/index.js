// import {
// 	mySync
// } from './components/sync';
// import {
// 	func1
// } from "./lib/test";
import "babel-polyfill";
import $ from 'jquery'
window.$ = $;
import angular from 'angular';
import uirouter from 'angular-ui-router';
import routing from './app.config';
import aModule from "./amodule";
// console.log(func1);
// mySync();

import "./index.css";
import "./style/css/font-awesome.css";
// "dist/css/bootstrap.css"
// import "bootstrap/dist/css/bootstrap.css";

import directive1 from "./directive1";
import sidebar from "./components/sidebar";

class homeController {
	constructor($rootScope, $scope) {
		console.log($rootScope);
		this.$rootScope = $rootScope;
		this.name = '张玺濛';
		this.$rootScope.test = "this is from rootscope";
		this.$rootScope.flag = false;
		$scope.testClick = () => {
			console.log("I am testClick function");
			this.$rootScope.flag = true;
		}
	};

	myClick() {
		console.log("I am myClick function");
		this.$rootScope.flag = true;
	}
}

homeController.$inject = ["$rootScope", "$scope"]

//angularjs webapp sample
angular.module('app', [aModule.name, sidebar.name, uirouter])
	.config(routing)
	.controller("homeController", homeController)
	.directive("directive1", directive1)