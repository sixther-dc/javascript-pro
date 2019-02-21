define(['dataservice'], function(dataservice){
    function showMsg() {
        console.log(dataservice.getData())
    };

    return {showMsg}
})