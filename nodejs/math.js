/**
 *
 * js在编译每个模块的时候，都会讲模块文件进行处理，最外层加上一个函数的形式来防止每个模块文件中的变量污染全局变量
 *
 * function (exports, require, module, __filename, __name) {
 *    exports.add=''''
 * }
 * require参数用来包含其模块进来，那么exports跟module参数分别代表什么意思呢
 * module代表了模块对象本身，包含了exports属性，exports属性中的方法就是暴露给调用方的东西
*/
exports.add=function () {
    console.log(__filename);
    console.log(__dirname);
    console.log(exports);
    console.log(require);
    console.log(module);
    var i=0;
    var sum=0;
    //var args=arguments;
    var l=arguments.length;
    while (i<l){
        sum += arguments[i++];
    }
    return sum
}