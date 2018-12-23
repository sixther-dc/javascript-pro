//得到apple列表
define(function () {
    var appleService = ['backend', function (backend) {
        this.getAppleList = function () {
            var data = backend.get();
            if (data==null){
                data = ["apple1", "apple2", "apple3"];
            }
            return data;
        }
    }];
    //这里的服务我也采用和系统服务一样的处理方式
    return appleService;
});
