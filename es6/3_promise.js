const fs = require("fs")


let p = new Promise((resolve, reject) => {
    fs.readFile("11.txt", (err, data11) => {
        resolve(data11)
    }) 
}
)
//promise 的链式回调来解决潜逃地狱问题
p.then(function(data){
    return new Promise((resolve, reject) => {
        fs.readFile("12.txt", (err, data12) => {
            resolve(data + "\r\n" + data12)
        })
    })
}).then(function(data) {
    return new Promise((resolve, reject) => {
        fs.readFile("13.txt", (err, data13) => {
            resolve(data + "\r\n" + data13)
        })
    })
}).then((data)=> {
    console.log(data)
})