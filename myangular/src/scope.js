var _ = require('lodash/core');
require("./Angular");

function initWatchVal() {}

function Scope() {
    this.$$watchers = [];
    this.$$lastDirtyWatch = null;
    this.$$asyncQueue = [];
    //标明scope的阶段
    this.$$phase = null;
    this.$$postDigestQueue = [];
    this.$$children = [];
    this.$root = this;

}

//清除phase
Scope.prototype.clearPhase = function () {
    this.$$phase = null;
}

//设置phase
Scope.prototype.beginPhase = function (phase) {
    if (this.$$phase) {
        throw this.$$phase + ' already in progress.';
    }
    this.$$phase = phase
}

Scope.prototype.$$postDigest = function (fn) {
    this.$$postDigestQueue.push(fn);
}
//圣杯模式实现scope的继承
//Object.create可以快速实现原型的继承, 基于构造函数创建子类
//TODO: 圣杯跟Object.create是有区别的
//FIXME: Object.create不会继承父构造函数的类对象，只会继承原型
Scope.prototype.$new = function (isolated) {
    var child;
    if (isolated) {
        child = new Scope();
        child.$root = this.$root;
        child.$$asyncQueue = this.$$asyncQueue;
        child.$$postDigestQueue = this.$$postDigestQueue;
    } else {
        var childScope = function () {};
        childScope.prototype = this;
        child = new childScope();
    }
    this.$$children.push(child);
    // var child = Object.create(this);
    child.$$watchers = [];
    child.$$children = [];
    child.$parent = this;
    return child;
};

Scope.prototype.$destory = function () {
    var siblings = this.$parent.$$children;
    var indexOfThis = siblings.indexOf(this);
    if (indexOfThis >= 0) {
        siblings.splice(indexOfThis, 1);
    }
    this.$$watchers = null;
}
Scope.prototype.$watch = function (watchFn, listenerFn, valueEq) {
    let self = this;
    var watcher = {
        watchFn: watchFn,
        listenerFn: listenerFn || function () {},
        last: initWatchVal,
        //!!的写法是为了兼容valueEq为undifined的情况
        valueEq: !!valueEq
    };

    this.$$watchers.push(watcher);
    //兼容嵌套watch的场景
    this.$root.$$lastDirtyWatch = null;
    return (function () {
        //TODO:闭包中的this指向了global
        var index = self.$$watchers.indexOf(watcher);
        if (index >= 0) {
            self.$$watchers.splice(index, 1);
            self.$root.$$lastDirtyWatch = null;
        }
    })
};

Scope.prototype.$$areEqual = function (newValue, oldValue, valueEq) {
    if (valueEq) {
        return _.isEqual(newValue, oldValue);
    } else {
        return newValue === oldValue ||
            (typeof newValue === 'number' && typeof oldValue === 'number' &&
                isNaN(newValue) && isNaN(oldValue));
    }
};
//实现一个递归调用的框架
Scope.prototype.$$everyScope = function (fn) {
    //如果dirty为true, 则递归去执行其子scope的digest
    if (fn(this)) {
        return this.$$children.every(function (child) {
            return child.$$everyScope(fn);
        })
    } else {
        return false
    }
}
Scope.prototype.$digestOnce = function () {
    var dirty;
    var self = this;
    var continueLoop = true;
    //_.forEach是lodash的写法
    this.$$everyScope(function (scope) {
        var newValue, oldValue;
        _.forEach(scope.$$watchers, function (watcher) {
            if (watcher) {
                //此处是计算表达式的值，所以一定是需要scope参数的
                newValue = watcher.watchFn(scope);
                oldValue = watcher.last;
                if (!scope.$$areEqual(newValue, oldValue, watcher.valueEq)) {
                    //这里不能用this，这里的this指的是lodash中的_
                    //递归调用digest的时候lastDirtyWatch是开始指定digest的scope的标记
                    //由于子scope上的$apply会触发整个tree的digest，所以此处的脏watch应该设置为全局的
                    self.$root.$$lastDirtyWatch = watcher;
                    //如果不执行深拷贝，那么oldValue，newValue将永远指向同一个引用，也会永远相等
                    watcher.last = (watcher.valueEq ? _.cloneDeep(newValue) : newValue);
                    //兼容第一次degest的时候oldValue为空的场景
                    watcher.listenerFn(newValue,
                        (oldValue === initWatchVal ? newValue : oldValue),
                        scope);
                    dirty = true;
                    //当最后一个dirty watch变为clean的时候，跳出loop
                } else if (self.$root.$$lastDirtyWatch === watcher) {
                    continueLoop = false;
                    return false;
                }
            }
        });
        //递归是不是要继续执行
        return continueLoop;
    });
    return dirty;
};

//循环调用$digestOnce直到所有的数据都趋于一致
//TODO: 这么做随着watch的增多肯定会有性能问题，使用的时候要注意
//FIXME: 检查最后一个dirty watch变为clean的时候可优化循环次数
Scope.prototype.$digest = function () {
    var ttl = 10;
    this.beginPhase("$digest");
    this.$root.$$lastDirtyWatch = null;
    var dirty;
    do {
        while (this.$$asyncQueue.length) {
            var asyncTask = this.$$asyncQueue.shift();
            this.$eval(asyncTask.expression);
        }
        dirty = this.$digestOnce();
        //写法值得学习
        if (dirty && !(ttl--)) {
            this.clearPhase();
            throw "10 digest iterations reached";
        }
    } while (dirty);
    this.clearPhase();

    while (this.$$postDigestQueue.length) {
        this.$$postDigestQueue.shift()();
    }
};

//为表达式铺垫
Scope.prototype.$eval = function (expr, arg) {
    return expr(this, arg)
}

//用来在angular框架之外执行某些事情，比如setTimeout
Scope.prototype.$apply = function (expr) {
    try {
        this.beginPhase("$apply");
        return this.$eval(expr)
    } finally {
        this.clearPhase();
        this.$root.$digest();
    }
}

Scope.prototype.$evalAsync = function (expr) {
    var self = this;
    //当scope不在apply或者digest阶段的时候，异步发起一次digest用来执行evelAsync函数
    if (!this.$$phase && !this.$$asyncQueue.length) {
        //TODO: 为什么this会改变， 改变成什么， 一定会再函数执行结束后执行么，为什么
        //FIXME: setTimeout中的this永远会是window, 函数中的setTimeout永远在函数体执行结束后再开始计时延迟执行
        setTimeout(function () {
            if (self.$$asyncQueue.length) {
                self.$root.$digest();
            }
        }, 0)
    }
    this.$$asyncQueue.push({
        scope: this,
        expression: expr
    })
};

Scope.prototype.$watchCollection = function (watchFn, listenerFn) {
    var self = this;
    var newValue,
        oldValue;
    var changeCount = 0;
    var internalWatchFn = function (scope) {
        debugger;
        newValue = watchFn(scope);
        if (_.isObject(newValue)) {
            //默认的lodash不支持判断包装类，所以此处使用自定义的包装类判断函数
            if(_.isArrayLike(newValue)) {
                //当检测的值从其他变为watch的时候
                if(!_.isArray(oldValue)) {
                    changeCount ++;
                    oldValue = [];
                };
                if(newValue.length !== oldValue.length) {
                    changeCount ++;
                    oldValue.length = newValue.length;
                }
                _.forEach(newValue, function(newItem, i) {
                    if (newItem != oldValue[i]) {
                        changeCount ++;
                        oldValue[i] = newItem
                    }
                })
            } else {

            }
        } else {
            if (!self.$$areEqual(newValue, oldValue, false)) { 
                changeCount++;
            }
            oldValue = newValue;
        }
        return changeCount;
    };
    var internalListenerFn = function () {
        listenerFn(newValue, oldValue, self)
    };
    return this.$watch(internalWatchFn, internalListenerFn);
};

module.exports = Scope;