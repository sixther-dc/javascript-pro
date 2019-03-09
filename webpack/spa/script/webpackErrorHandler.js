
const errHandler = (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      process.exit(1);
      return;
    }
  
    const info = stats.toJson({timings: true});
  
    if (stats.hasErrors()) {
      console.error(info.errors);
    }
  
    if (stats.hasWarnings()) {
      console.warn(info.warnings)
    }
  
    console.log(stats.toString({
      chunks: false,  // 使构建过程更静默无输出
      colors: true    // 在控制台展示颜色
    }));
  }
  
  module.exports = errHandler