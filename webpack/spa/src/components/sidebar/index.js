import './index.css';
import angular from "angular";
import sidebar from "./sidebar";
import servicelist from './components/servicelist'
import {
    dragServiceName,
    cfSidebarCollectionItem,
    cfDragRemoveService,
    cfSearchInput
} from './directives/drag';
export default angular.module('sidebar', [servicelist.name])
    .component('sidebar', sidebar)
    .directive('dragServiceName', dragServiceName)
    .directive('cfSidebarCollectionItem', cfSidebarCollectionItem)
    .directive('rrr', cfDragRemoveService)
    .run(["$templateCache", function (c) {
        c.put('src/components/sidebar/sidebar.html', './sidebar.html');
    }])