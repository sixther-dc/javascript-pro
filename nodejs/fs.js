var fs=require('fs');
var fileList=['1,js','http.js','module.js'];

for (var i=0; i<3; i++) {
    fs.readFile(fileList[i],'utf8',function (err,contents) {
        //console.log(i);
        //console.log(fileList[i]);
        //console.log(contents);
    })
}

/** 上面的for循环，由于node是异步的，所以会在循环接受后再执行其中的回调函数，而循环结束后，i的值已经变成了三  **/

/** 需要找一个东西将i的值接收下来,答案是闭包 **/
for (var i=0;i<3; i++){
    (function (index) {
        fs.readFile(fileList[index],'utf8', function(err,contents){
            console.log(index);
            //console.log(contents);
        })
    })(i)
}


/** 还有一种更简单的方法，就是数组的forEach方法**/
/** 后两种方法其实就是是用了三个变量去开启了三个异步任务，再回调回来变量还在，所以不影响，第一种是因为用了一个数组指针开启了三个异步任务，回调回来的指针只有一个值 **/
fileList.forEach(function (filename) {
    fs.readFile(filename,'utf8',function (err,contents) {
        console.log(filename);
        //console.log(contents);
    })
})
