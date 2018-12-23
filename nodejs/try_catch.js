function showName() {
    console.log('sixther');
    //abd   //这里引用一个不存在的变量，制造一个回调函数中的异常
}
var async = function (callback) {
    process.nextTick(callback);
}

/*
 * 由于异步的特征，node对回调函数中的错误无法执行try catch，对于这种情况，node有一个约定，即将异常作为回调函数的第一个参数传回
 */
try {
    async(showName);
} catch (e){
    console.log('error');
}

