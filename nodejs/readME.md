* 第4章异步编程未全部读完
* 第7章网络服务与安全部分未读


hterm source -  https://chromium.googlesource.com/apps/libapps/+/master/hterm/ 

#WebShell使用说明

```javascript
cd chat
npm install
node index.js 

浏览器访问：
http://ip:8000
```








##问题
1，exec执行命令的时候抱 Error: stdout maxBuffer exceeded
node会创建一个Buffer来存放命令的执行结果，maxBuffer指定这个Buffer的大小

```javascript
var child = exec('ls -lah', {
	encoding: 'utf8',
	timeout: 0,
	maxBuffer: 5000 * 1024, // 默认 200 * 1024
	killSignal: 'SIGTERM'
}, function(err, stdout, stderr) {
	console.log(stdout);
});
```