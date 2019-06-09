import './index.css';
import angular from "angular";
import servicelist from "./servicelist";
import {cfSearchInput} from "../../directives/drag";
export default angular.module('servicelist', [])
    .component('servicelist', servicelist)
    .directive('cfSearchInput', cfSearchInput)
    .run(["$templateCache", function (c) {
        c.put('src/components/sidebar/components/servicelist/servicelist.html', './servicelist.html');
    }])