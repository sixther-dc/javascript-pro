//得到apple列表
define(function () {
    var pearService = ['backend', function (backend) {
        this.getPearList = function () {
            var data = backend.get();
            if (data==null){
                data = ["pear1", "pear2", "pear3"];
            }
            return data
        }
    }];
    //这里的服务我也采用和系统服务一样的处理方式
    return pearService;
});
