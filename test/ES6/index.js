// 块级作用域
// 只在代码块内生效，并且不会被提升到顶部
// 给js添加灵活性，以及与其他语言的一致性
{
    //console.log(aa);
    //即使在代码块内部，let声明的变量也不会给提升到顶部
    let aa = "javascript";
    console.log(aa);
}

// 是用const声明的变量，可以修改它的成员
const bb = {
    name: "dc"
}
bb.name = "dcc";
console.log(bb);

// 暂时性死区，表示let或者const声明的变量无法被访问
// js依然在预编译阶段寻找变量的声明， var声明的变量会放到作用域中， let，const会放在暂时性死区中
typeof (cc);
let cc = 1;