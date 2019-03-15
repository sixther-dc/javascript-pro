const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
    apply(compiler) {
        compiler.hooks.run.tap(pluginName, compilation => {
            console.log("webpack 构建过程开始！");
        });
    }
}

module.exports = ConsoleLogOnBuildWebpackPlugin;

//一定要有apply
//compiler上留有钩子 给外界可以注册的接口
//webpack执行的时候执行注册在compiler上的代码 

// TODO: tapable
//创建， webpack创建了各种各样的钩子   compliler 
//注册， 插件注册进钩子
//执行 

//初始化， 读取合并参数，加载plugin 实例化compoliler

// webpack-internal-plugin-relation    github