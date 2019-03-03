import angular from 'angular';
import uirouter from 'angular-ui-router';
import routing from './app.config';
import stdata from './stdata';

//angularjs webapp sample
angular.module('app', [uirouter, stdata.name])
	.config(routing)
