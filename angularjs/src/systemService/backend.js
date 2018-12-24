//项后端发起ajax请求
define(function () {
    var service = [function () {
        this.get = function () {
            $.ajax({
                method: 'GET',
                url: 'http://localhost:8080/opt/test/201500301038'
            }).done(function (data) {
                return data;
            });
        }
    }];
    return service;
});
