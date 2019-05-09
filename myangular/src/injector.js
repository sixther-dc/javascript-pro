var loader = require("./loader");

function Injector(window) {
    loader(window);
    this.providerCache = {};
    this.instanceCache = {};
    var annotate = (fn) => {
        if (typeof(fn) === "function")
        {
            return fn.$inject || []
        } else {
            //数组的情况
            return fn.slice(0, fn.length - 1);                    
        }
    };
    var invoke = (fn, self) => {
        var args = annotate(fn).map((item) => {
            return getService(item)
        });
        if (typeof(fn) === "function")
        {
            fn = fn;
        } else {
            fn = fn.pop()    
            console.log(fn,'fff')                
        }
        return fn.apply(self, args);
    };
    var instantiate = (fn) => {
        var instance = {};
        //将this绑定到一个空对象上，便是一个构造函数的实例
        //模拟new操作
        instance.__proto__ = fn.prototype;
        result.invoke(fn, instance);
        return instance
    };
    var getService = (name) => {
        if(this.instanceCache.hasOwnProperty(name)) {
            return this.instanceCache[name];
        } else if (this.providerCache.hasOwnProperty(name + 'Provider')) {
            var provider = this.providerCache[name + 'Provider']
            this.instanceCache[name] = invoke(provider.$get, provider);
            return this.instanceCache[name]
        }
    }
    var $provide = {
        constant: (key, value) => {
            //js没有保护 hasOwnProperty
            if (key === 'hasOwnProperty') {
                throw 'hasOwnProperty is not a valid constant name!'; 
            }
            this.instanceCache[key] = value;
        },
        provider: (key, obj) => {
            //可以使用构造函数来注册provider
            if(typeof(obj) === "function") {
                obj = instantiate(obj);
            }
            this.providerCache[key + 'Provider'] = obj;
        }
    };

    this.createInjector = function (modulesToLoad) {
        //保证所有的module只被处理一次，防止有module之间互相依赖的情况
        modulesToLoad.forEach(fn = (element) => {
            var module = window.angular.module(element);
            //迭代处理有依赖的module的情况
            module.requires.forEach(fn);
            module._invokeQueue.forEach(i => {
                //i ["constant", ["name", "value"]]
                var method = i[0];
                var args = i[1]
                $provide[method].apply($provide, args);
            })
        });
        return result = {
            has: (name) => {
                return this.instanceCache.hasOwnProperty(name) || this.providerCache.hasOwnProperty(name + 'Provider')
            },
            get: getService,
            annotate: annotate,
            invoke: invoke,
            instantiate: instantiate
        }
    }
}

module.exports = Injector;