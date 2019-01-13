angularjs概念：
控制器函数什么时候执行？
当解析html的时候,它的ng-controller遇到什么控制器,它就去实例化哪个控制器.这个时候,控制器里面的代码才会被执行到,服务等依赖也在这个时间被注入.

待解决问题
____________________________________
ng-include是啥
指令怎么搞
webpack如何打包图片
搞一个圆角tab页

webpackJsonp数组

http://webpack.wuhaolin.cn/

https://www.jianshu.com/p/0e5247f9975f

css知识
______________
1,   !important优先级 > 行间样式优先级 > 高于id优先级 > class优先级 = 属性优先级 > 高于标签优先级 > *
2,CSS权重    Infinity >       1000  > 100         >10          = 10       > 1            > 0
256进制
3,属性选择器,选中属性有id的元素
[id="only"]
[id] {

}
4,凡是带有inline，inline-block都有文字属性。
5,盒子的组成部分
外边距: margin    针对相邻元素设置，包裹元素不考虑
盒子壁: border
内边距: padding   不能放内容
内容: width + height
6,定位
7,层模型
当一个元素变成绝对定位的时候，他会脱离原来的位置
8,margin塌陷问题，使用bfc解决  block format context  设置换后可以改变css渲染的语法规则 
如何触发:
overflow:hidden
position:absolute
display:inline-block
float:right/left
9,margin合并问题
对于两个元素的平行margin是分开的       垂直的margin是合并的 ，解决垂直的合并的方法还是bfc
为了解决问题而增加html的方法一般不采取，所以margin合并一般不解决，通过增加像素值来搞定
10,浮动模型
浮动元素产生了浮动流
所有产生了浮动流的元素，块级元素看不到他们，产生bfc的元素，文本元素，以及文本可以看到他们 
11, chrome中的样式如果是灰色的标识它是一个继承属性
12, position:absolute
    float:right/left
    行级元素有了这两个属性，在内部会转换成inline-block
13, 一个行级别块元素里面如果包含文本，那么他旁边的文办将会跟里面的文本底对齐

clear 清楚周围的浮动流
通常使用伪元素来清楚浮动流带来的效果