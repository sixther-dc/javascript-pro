var _ = require('lodash/core');

_.mixin({
    isArrayLike: function (obj) {
        //length属性为数字的都为包装类
        if (_.isNull(obj) || _.isUndefined(obj)) {
            return false;
        }
        var length = obj.length;
        return _.isNumber(length);
    }
});