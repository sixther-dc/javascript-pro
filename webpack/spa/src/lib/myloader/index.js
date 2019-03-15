// [xx1-loader, xx2-loader]
module.exports = function(content, map, meta) {
    console.log(content);
    return content;
}

// 前置钩子
module.exports.pitch = function(remainRequest, preRequest, data) {
    data.value = "test"
} 

// 执行顺序
// xx1-loader pitch
// xx2-loader pitch
// xx2
// xx1


//原理，  转成AST语法树，   编译原理
//分析工具  Uglify   acorn