const fs = require("fs")

//返回一个 promise 对象，后面使用 await 来处理
function readfile(filename){
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (err, data) => {
            if (err) reject(err)
            resolve(data.toString())
        })
    })
}

async function main() {
    //如果 await 后面的 promise 返回的是 reject 的话则要使用 try-catch 来处理。
    let p11 = await readfile("11.txt")
    let p12 = await readfile("12.txt")
    let p13 = await readfile("13.txt")
    console.log(p11, p12, p13)
}


console.log(globalThis)
main()