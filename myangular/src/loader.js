function setupModuleLoader(window){
    //有angular的时候直接使用
    // var angular = ( window.angular = window.angular ||  {} )
    // load once模式
    var ensure = function(obj, name, factory) {
        return obj[name] || (obj[name] = factory())
    }

    var angular = ensure(window, 'angular', Object)

    var createModule = function(name, requires, modules) {
        //js没有保护hasOwnProperty, 禁止用户定义hasOwnProperty模块来重写modules的hasOwnProperty方法
        if (name === "hasOwnProperty") {
            throw("hasOwnProperty is not a valid module name");
        }
        var invokeQueue = [];
        var moduleInstance = {
            name: name,
            requires: requires,
            constant: function(name, value) {
                invokeQueue.push(["constant", [name, value]])
            },
            _invokeQueue: invokeQueue
        };
        modules[name] = moduleInstance;
        return moduleInstance;
    };
    var getModule = function(name, modules){
        if (modules.hasOwnProperty(name)) {
            return modules[name];
        } else {
            throw("Module" + name + " is not available")
        }
    }
    ensure(angular, "module", function(){
        var modules = {}
        return function(name, requires){
            if(requires) {
                return createModule(name, requires, modules)
            } else {
                return getModule(name, modules)
            }
        }
    })
}

module.exports = setupModuleLoader;