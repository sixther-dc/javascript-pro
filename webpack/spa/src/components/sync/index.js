import {isArray} from "lodash-es";
import item from './sync.css';
//需要style-loader加持 

function mySync(){
    document.getElementById("app").innerHTML = `<h1 class=${item.test}>Hello, World</h1>`
    console.log("I am sync function");
}

//tree-shaking分析不到scope里的东西？？？
//webpack-deep-scope-plugin使用该插件来解决
function misArray(args) {
    console.log(isArray(args));
    console.log("I use a function from lodash-es duanchao");
}

export {mySync, misArray};