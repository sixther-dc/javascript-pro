import './index.css';
import angular from "angular";
import sidebar from "./sidebar";
import servicelist from './components/servicelist'
export default angular.module('sidebar', [servicelist.name])
    .component('sidebar', sidebar)
    .run(["$templateCache", function(c) {
        c.put('src/components/sidebar/sidebar.html', './sidebar.html');
    }])