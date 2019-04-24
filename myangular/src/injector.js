var loader = require("./loader");

function Injector(window) {
    loader(window);
    this.cache = {};
    var $provide = {
        constant: (key, value) => {
            //js没有保护 hasOwnProperty
            if (key === 'hasOwnProperty') {
                throw 'hasOwnProperty is not a valid constant name!'; 
            }
            this.cache[key] = value;
        }
    };

    this.createInjector = function (modulesToLoad) {
        modulesToLoad.forEach(element => {
            console.log(window.angular)
            var module = window.angular.module(element);
            console.log(module);
            module._invokeQueue.forEach(i => {
                //i ["constant", ["name", "value"]]
                var method = i[0];
                var args = i[1]
                $provide[method].apply($provide, args);
            })
        });
        return {
            has: (name) => {
                return this.cache.hasOwnProperty(name);
            },
            get: (name) => {
                return this.cache[name];
            }
        }
    }
}

module.exports = Injector;