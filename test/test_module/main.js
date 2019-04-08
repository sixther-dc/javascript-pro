requirejs.config({
    paths: {
        alter: './alter',
        dataservice: './dataService'
    }
});
//只有reqiure之后common里面的语句才会被执行
require(['alter', "common"], function(alter){
    alter.showMsg();
})