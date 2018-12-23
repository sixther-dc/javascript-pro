/*
 * Scavenge内存回收算法， 将堆内存一分为二，程序申请的内存会先存放在From区域，发生内存回收的时候，V8会检查From中的对象，如果还在用则复制到To区域，检查完毕后，From跟To的角色发生互换。
 * 缺点： 只能利用内存的一半。适合用在新生代中。
 * To空间的上限永远只有25%，当To空间中的内存达到25%的时候，From空间中的对象则直接晋升到老生代。
 *
 * 对于老生代，由于老生代的对象较多，复制起来效率低下并且会有一半的内存空间浪费，所以Scavenge的算法不适合老生代。
 * Mark-Sweep 和 Mark-Compact
 * Mark-Sweep会扫描老生代的对象，对于死亡的执行删除操作，删除之后内存会出现不连续的情况，然后使用Mark-Compack移动对象，使内存重新变的连续。
 *
 * 由于新生代的内存配置的比较小，所以对新生代执行内存回收的时候对程序的影响不大
 * 老生代由于体量比较大，一次Full GC对程序有显著的影响
 *
 * node --trace-gc test.js 可以查看详细的内存回收状态
 *
 * node --prof test.js 可以查看垃圾回收占用的时间，会在当前目录下生成一个log文件，使用如下命令对其进行查看：
 *
 * linux-tick-processor *log
 *
 * v8中的全局变量以及闭包会是内存回收需要重点关注的部分
 * v8中最好通过赋值的方式来释放一个变量
 */

var showMem=function () {
    var mem=process.memoryUsage();
    var format=function (bytes) {
        return (bytes / 1024 / 1024) + 'MB';
    }
    console.log('heapTotal: ' + format(mem.heapTotal));
    console.log('heapUsed: ' + format(mem.heapUsed))
    console.log('RSS: ' + format(mem.rss));
    console.log('---------------------------------------');

}


var useMem=function () {
    var size = 200 * 1024 * 1024;
    //var arr=new Array(size);
    var buffer=new Buffer(size);   //Buffer为堆外内存,不会有1.4G的限制,不会走V8的内存分配机制
    for (var i=0; i<size; i++) {
        //arr[i]=0;
        buffer[i]=0;
    }
    //return arr;
    return buffer;
}
var total=[];
for (var j=0; j<0; j++){
    showMem();
    total.push(useMem());
}
showMem();

/*
 * 声明一个构造函数, 返回一个可限制大小的对象，用来限制内存的无限增长
 */

var LimitableMap=function (limit) {
    this.limit=limit || 10;
    this.map={};
    this.keys=[];
}

var hasOwnProperty=Object.prototype.hasOwnProperty;  //用户判断一个属性是否存在于一个对象中

LimitableMap.prototype.set=function (key,value) {
    var map = this.map;
    var keys = this.keys;
    if (!(hasOwnProperty.call(map, key))) {
        if (keys.length === this.limit) {
            var firstKey = keys.shift();
            delete map[firstKey];
        }
        keys.push(key);
    }
    map[key]=value;
}

LimitableMap.prototype.get=function (key) {
    return this.map[key];
}

var a=new LimitableMap(10);
a.set('a',1);
a.set('b',2);

a.set('c',3);

a.set('d',4);
a.set('e',5);
a.set('f',6);
a.set('g',7);
a.set('h',8);
a.set('i',9);
a.set('j',10);
a.set('k',11);



console.log(a);


/*
 * 使用node进行大文件的复制， 流式做法可以减少对内存的浪费
 * var reader = fs.createReadStream('in.txt')
 * var writer = fs.createWriterStream('out.txt')
 * reader.pipe(writer)
 */