var start=(new Date()).getTime();

while (true){
    var now=(new Date()).getTime();
    if(now - start > 1000) {
        console.log('sleep');
        break;
    }


}