进度： 主从组件


Q: class里为什么不能定义const的变量？  
Q: angular.json文件是做什么的？  
A: 修改后需要重新ng serve生效?

Q: forRoot跟forChild分别是干什么的？
Q: useFactory对接口的实现是如何定义的？




_____________________________________
1，ts默认使用commonjs的规范来加载模块，因此没有触发tree-shaking，可以在tsconfig.json中将target改为es6
2，装饰器看起来就是可以给被装饰的东西增加一些公用的东西，比如方法等。
3, ClassProvider用于将某个类作为依赖注入的对象，同时可以修改该类为其他的类
   FactoryProvider用于被作为注入对象的类的构造函数有参数的得情况下
   ValueProvider用于将某个变量作为被注入的对象


https://codepen.io/    css灵感站

https://caniuse.com/#search=console   哪些浏览器支持哪些方法
