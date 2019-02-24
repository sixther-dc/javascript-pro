(function(){
    define(['dataservice'], function(dataservice){
        var duan = "chao";
        function showMsg() {
            console.log(dataservice.getData())
        };
    
        return {showMsg}
    })
}())