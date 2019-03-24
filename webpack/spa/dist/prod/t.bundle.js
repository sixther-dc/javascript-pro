/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main_t": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.js","vendors","stcommon","stdata"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/amodule.js":
/*!************************!*\
  !*** ./src/amodule.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);



class testController {
    constructor() {
      this.name = 'zhangximeng';
    }
}
  

//angularjs webapp sample
const aModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('amodule', [])
    .controller("testController", testController)

/* harmony default export */ __webpack_exports__["default"] = (aModule);

/***/ }),

/***/ "./src/app.config.js":
/*!***************************!*\
  !*** ./src/app.config.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return routing; });
routing.$inject = ['$urlRouterProvider', '$locationProvider'];

function routing($urlRouterProvider, $locationProvider) {
//   $locationProvider.html5Mode(true);
//   $urlRouterProvider.otherwise('/');
}

/***/ }),

/***/ "./src/directive1.html":
/*!*****************************!*\
  !*** ./src/directive1.html ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n    <div class=\"title\" ng-click=\"toggle()\">title</div>\n    <div class=\"body\" ng-show=\"showMe\" ng-transclude></div>\n    <style>\n            .title {\n                background-color: black;\n                color: white\n            }\n    </style>\n</div>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n";

/***/ }),

/***/ "./src/directive1.js":
/*!***************************!*\
  !*** ./src/directive1.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function directive1() {
    return {
        restrict: "EA",
        replace: true,
        transclude: true,
        scope: {
            title:'=title'
        },
        // template: "<div>I am a directive</div>",
        template: __webpack_require__(/*! ./directive1.html */ "./src/directive1.html"),
        link: function(scope, elememt, attrs) {
            console.log(scope, "ssss");
            console.log(elememt, "eeeeee");
            console.log(attrs, "aaaaa");
            scope.showMe = true;
            scope.toggle = function() {
                console.log("I am toggle function from directive1");
                scope.showMe = !scope.showMe;
            }
        }
    }
}
/* harmony default export */ __webpack_exports__["default"] = (directive1);

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular_ui_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular-ui-router */ "./node_modules/angular-ui-router/lib-esm/index.js");
/* harmony import */ var _app_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.config */ "./src/app.config.js");
/* harmony import */ var _amodule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./amodule */ "./src/amodule.js");
/* harmony import */ var _sixther_st_stcommon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sixther/st/stcommon */ "../mylib/package/stcommon.js");
/* harmony import */ var _sixther_st_stcommon__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_sixther_st_stcommon__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _sixther_st_stdata__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sixther/st/stdata */ "../mylib/package/stdata.js");
/* harmony import */ var _sixther_st_stdata__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_sixther_st_stdata__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./index.css */ "./src/index.css");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _directive1__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./directive1 */ "./src/directive1.js");
// import {
// 	mySync
// } from './components/sync';
// import {
// 	func1
// } from "./lib/test";






// console.log(func1);
// mySync();


// "dist/css/bootstrap.css"
// import "bootstrap/dist/css/bootstrap.css";



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
angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('app', [_amodule__WEBPACK_IMPORTED_MODULE_3__["default"].name, angular_ui_router__WEBPACK_IMPORTED_MODULE_1__["default"], _sixther_st_stdata__WEBPACK_IMPORTED_MODULE_5___default.a.name])
	.config(_app_config__WEBPACK_IMPORTED_MODULE_2__["default"])
	.controller("homeController", homeController)
	.directive("directive1", _directive1__WEBPACK_IMPORTED_MODULE_7__["default"])

/***/ })

/******/ });
//# sourceMappingURL=t.bundle.js.map