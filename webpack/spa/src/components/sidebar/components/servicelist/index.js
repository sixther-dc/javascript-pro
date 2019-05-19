import './index.css';
import angular from "angular";
import servicelist from "./servicelist";
export default angular.module('servicelist', [])
    .component('servicelist', servicelist)
    .run(["$templateCache", function (c) {
        c.put('src/components/sidebar/components/servicelist/servicelist.html', './servicelist.html');
    }])