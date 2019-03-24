var _ = require('lodash/core');

function initWatchVal(){}

function Scope() {
    this.$$watchers = [];
    this.$$lastDirtyWatch = null;
    this.$$asyncQueue = [];
}
Scope.prototype.$watch = function(watchFn, listenerFn, valueEq){
    var watcher = {
        watchFn : watchFn,
        listenerFn : listenerFn || function(){},
        last : initWatchVal,
        //!!的写法是为了兼容valueEq为undifined的情况
        valueEq : !!valueEq
    };

    this.$$watchers.push(watcher);
    //兼容嵌套watch的场景
    this.$$lastDirtyWatch = null;
};

 Scope.prototype.$$areEqual = function(newValue, oldValue, valueEq){
    if (valueEq) {
        return _.isEqual(newValue, oldValue);
    } else {
        return newValue === oldValue ||
        (typeof newValue === 'number' && typeof oldValue === 'number' &&
               isNaN(newValue) && isNaN(oldValue));
    }
};

Scope.prototype.$digestOnce = function() {
    var self = this;
    //_.forEach是lodash的写法
    var newValue, oldValue, dirty;
    _.forEach(this.$$watchers, function(watcher) {
        //此处是计算表达式的值，所以一定是需要scope参数的
        newValue = watcher.watchFn(self);
        oldValue = watcher.last;
        if (!self.$$areEqual(newValue, oldValue, watcher.valueEq)) {
            //这里不能用this，这里的this指的是lodash中的_
            self.$$lastDirtyWatch = watcher;
            //如果不执行深拷贝，那么oldValue，newValue将永远指向同一个引用，也会永远相等
            watcher.last = (watcher.valueEq ? _.cloneDeep(newValue) : newValue);
            //兼容第一次degest的时候oldValue为空的场景
            watcher.listenerFn(newValue, 
                (oldValue === initWatchVal ? newValue : oldValue),
                self);
            dirty = true;
        //当最后一个dirty watch变为clean的时候，跳出loop
        } else if (self.$$lastDirtyWatch === watcher) {
            return false;
        }
    });
    return dirty;
};

//循环调用$digestOnce直到所有的数据都趋于一致
//TODO: 这么做随着watch的增多肯定会有性能问题，使用的时候要注意
//FIXME: 检查最后一个dirty watch变为clean的时候可优化循环次数
Scope.prototype.$digest = function() {
    var ttl = 10;
    this.$$lastDirtyWatch = null;
    var dirty;
    do {
        while(this.$$asyncQueue.length) {
            var asyncTask = this.$$asyncQueue.shift();
            this.$eval(asyncTask.expression);
        }
        dirty = this.$digestOnce();
        //写法值得学习
        if (dirty && !(ttl--)) {
            throw "10 digest iterations reached";
        }
    } while(dirty);
};

//为表达式铺垫
Scope.prototype.$eval = function(expr, arg){
    return expr(this, arg)
}

//用来在angular框架之外执行某些事情，比如setTimeout
Scope.prototype.$apply = function(expr) {
    try {
        return this.$eval(expr)
    } finally {
        this.$digest();
    }
}

Scope.prototype.$evalAsync = function(expr){
    this.$$asyncQueue.push({
        scope: this,
        expression: expr
    })
}
module.exports = Scope;