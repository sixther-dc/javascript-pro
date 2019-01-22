define(function () {
    var jsTestCtrl = ['$scope', function ($scope) {
        console.log("===============================================");
        console.log("hello, world.")

        // 预编译概念
        function test(n) {
            //未经声明就赋值的变量归window所有, 在GO里
            
            var a = b = 121;
            console.log(n); //打印function
            var n = "test";
            console.log(n); //打印test，AO中的n被覆盖
            //函数声明部分跳过，已经在预编译过程中执行
            function n() {
                console.log("I am n");
            }
        }
        //当test函数中有一个n函数的的时候，这个1还能传进入么, 可以使用函数表达式来替换函数声明
        test(1);
        // document.write("sdfafas");

        // 作用域概念
        function a() {
            function b(){
                aa = 0
            }
            var aa = 234;
            console.log(aa);  //234
            b();
            console.log(aa);  //0  证明了b的scope中的一个AO跟a的AO是一个AO，只是引用赋值
        }
        a();
    }];

    return jsTestCtrl;
});
