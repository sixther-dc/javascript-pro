import './index.css';
import angular from "angular";
import sidebar from "./sidebar";
export default angular.module('sidebar', [])
    .component('sidebar', sidebar)
    .run(["$templateCache", function(c) {
        c.put('src/components/sidebar/sidebar.html', './sidebar.html');
    }])