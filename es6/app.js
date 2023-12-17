import * as m1 from "./m1.js"
import {name, call} from "./m2.js"
import m3 from "./m3.js"

console.log(m1.name)
m1.call()
console.log(name)
call()

console.log(m3)
console.log(m3.name)
m3.call()

console.log((0.1 + 0.2) === 0.3)
console.log(Number.EPSILON)

function equal(a, b) {
    console.log(a)
    if (Math.abs(a-b) <= Number.EPSILON) {
        return true
    }
    return false
}

console.log(equal((0.1+0.2), 0.3))

let equal1 = (a,b) => Math.abs(a-b) <= Number.EPSILON
console.log(equal1((0.1+0.2), 0.3))
