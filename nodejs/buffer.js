/*
 * 一，Buffer结构
 *
 * Buffer对象的内存分配是Node在C++层面实现的内存申请，采用的是常见的slab内存分配机制
 * slab就是一块申请好的固定大小的内存区域，有三种状态：
 * 1，full        完全分配的
 * 2，partial     部分分配的
 * 3，empry       完全没有被分配的
 * 每个slab的大小为8k， 每次new Buffer的时候检查当前有没有可用的slab，如果有，在该slab上分配Buffer，如果没有，则重新申请一块slab，之前的partial状态的slab将会有内存浪费
 *
 *
 * 小于8k的Buffer还是会在JavaScript层面中，能够被v8d的垃圾回收标记，大于8k的Buffer则直接在C++层面，不收V8的回收机制影响
 *
 *
 * 二，Buffer转换
 */

var buf=new  Buffer(8);
buf.write('duanchao','utf8');
buf.toString();

Buffer.isEncoding('utf8');  //判断是否支持给定编码的转换，常见的GBK就不支持。


/*
 *
 * 三，Buffer拼接
 *
 */

var fs=require('fs');
var rs=fs.createReadStream('memory.js',{highWaterMark: 11});    //这里将每次读取的Buffer流限制为11，由于中文在utf-8下占3个字符，所有会有截断发生，会出现乱码，乱码频率随着buffer长度的增加而增加，但不会完全消除
rs.setEncoding('utf8');   //添加这行后乱码情况会消失，因为setEncoding会以编码类型的单位长度再次重新组码，但只支持Utf8，Base64等
var data=''
rs.on('data',function (chuck) {
    data +=chuck;    //等于 data = data.toString() + chunk.toString()
    //console.log(typeof chuck);
   //console.log(chuck);    //chuck就是Buffer对象

})
rs.on('end',function () {
    //console.log(data);
})


/*
 * 拼接最好的实现方法是使用Buffer.concat([array],[length]),将小的Buffer片段组成一个大Buffer然后在转码
 */

var length=0;
var chunks=[];
var rs1=fs.createReadStream('memory.js',{highWaterMark: 11});    //highWaterMark默认是16k

rs1.on('data',function (chunk) {
    chunks.push(chunk);
    length += chunk.length;
})

rs1.on('end',function () {

    var buffer=Buffer.concat(chunks,length);
    console.log(buffer.toString());
})


/*
 * 四，Buffer性能
 *
 * 在http网络传输中，将字符串改为Buffer传输，传输效率会大大提高
 * node在做web应用的时候，推荐推荐静态数据使用Buffer传输，可大大提高效率
 */
