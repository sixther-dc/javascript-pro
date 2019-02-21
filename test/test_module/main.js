requirejs.config({
    paths: {
        alter: './alter',
        dataservice: './dataService'
    }
});

require(['alter'], function(alter){
    alter.showMsg();
})