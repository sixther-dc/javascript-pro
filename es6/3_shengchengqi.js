const fs = require("fs")


// function read11() {
//     fs.readFile("11.txt", (err, data11) => {
//         p.next(data11)
//     })
// }

// function read12(data) {
//     fs.readFile("12.txt", (err, data12) => {
//         p.next(data + "\r\n" + data12)
//     })
// }


// function read13(data) {
//     fs.readFile("13.txt", (err, data13) => {
//         console.log(data + "\r\n" + data13)
//     })
// }


function readfile(name, buf) {
    fs.readFile(name, (err, data) => {
        if (buf == undefined) {
            p.next(data)
        } else {
            p.next(buf + "\r\n" + data)
        }
    })
}

function * gen(){
    data11 = yield readfile("11.txt")
    data12 = yield readfile("12.txt", data11)
    data = yield readfile("13.txt", data12)
    console.log(data)
}

let p = gen()
p.next()